import db from "../config/db.js";

// status atual do perfil do cuidador ('pendente' | 'aprovado' | 'rejeitado'), ou null se nao tem perfil
export const buscarStatus = (usuarioId, cb) => {
  db.query(
    "SELECT status FROM perfil_cuidadores WHERE usuario_id = ?",
    [usuarioId],
    (err, results) => {
      if (err) return cb(err);
      cb(null, results && results[0] ? results[0].status : null);
    }
  );
};

// procura outro cuidador com o mesmo CPF (compara so digitos), ignorando o proprio usuario
export const buscarPorCpf = (cpfDigitos, ignorarUsuarioId, cb) => {
  db.query(
    `SELECT usuario_id FROM perfil_cuidadores
     WHERE REPLACE(REPLACE(REPLACE(cpf, '.', ''), '-', ''), ' ', '') = ?
       AND usuario_id <> ?`,
    [cpfDigitos, ignorarUsuarioId || 0],
    (err, results) => {
      if (err) return cb(err);
      cb(null, results && results[0] ? results[0] : null);
    }
  );
};

export const buscarPorUsuarioId = (usuarioId, cb) => {
  const sql = `
    SELECT p.*, u.nome
    FROM perfil_cuidadores p
    JOIN usuarios u ON u.usuario_id = p.usuario_id
    WHERE p.usuario_id = ?
  `;
  db.query(sql, [usuarioId], (err, results) => {
    if (err) return cb(err);
    const row = results && results[0];
    if (row && row.especialidades && typeof row.especialidades === "string") {
      try {
        row.especialidades = JSON.parse(row.especialidades);
      } catch {
        row.especialidades = [];
      }
    }
    cb(null, row || null);
  });
};

const COLUNAS_PERFIL = [
  "bio",
  "especialidades",
  "preco_hora",
  "cidade",
  "bairro",
  "foto_url",
  "telefone",
  "cpf",
  "disponivel_busca",
];

// upsert — so colunas da whitelist
export const salvarOuAtualizarPerfil = (usuarioId, data, cb) => {
  const allowed = {};
  COLUNAS_PERFIL.forEach((col) => {
    if (data[col] !== undefined) allowed[col] = data[col];
  });
  if (Object.keys(allowed).length === 0) {
    return buscarPorUsuarioId(usuarioId, cb);
  }
  if (allowed.especialidades && Array.isArray(allowed.especialidades)) {
    allowed.especialidades = JSON.stringify(allowed.especialidades);
  }
  if (allowed.disponivel_busca !== undefined) {
    allowed.disponivel_busca = allowed.disponivel_busca ? 1 : 0;
  }

  buscarPorUsuarioId(usuarioId, (err, existing) => {
    if (err) return cb(err);
    const keys = Object.keys(allowed);
    const values = keys.map((k) => allowed[k]);

    if (existing) {
      // se o perfil estava rejeitado e o cuidador editou, volta pra analise
      const resetStatus = existing.status === "rejeitado"
        ? ", status = 'pendente', motivo_rejeicao = NULL"
        : "";
      const setClause = keys.map((k) => `${k} = ?`).join(", ");
      const sql = `UPDATE perfil_cuidadores SET ${setClause}${resetStatus} WHERE usuario_id = ?`;
      db.query(sql, [...values, usuarioId], (err2, result) => {
        if (err2) return cb(err2);
        buscarPorUsuarioId(usuarioId, cb);
      });
    } else {
      // perfil novo sempre entra como pendente, aguardando aprovacao do admin
      const cols = ["usuario_id", ...keys, "status"];
      const placeholders = ["?", ...keys.map(() => "?"), "?"];
      const sql = `INSERT INTO perfil_cuidadores (${cols.join(", ")}) VALUES (${placeholders.join(", ")})`;
      db.query(sql, [usuarioId, ...values, "pendente"], (err2, result) => {
        if (err2) return cb(err2);
        buscarPorUsuarioId(usuarioId, cb);
      });
    }
  });
};

// filtra especialidade por LIKE no JSON serializado
export const listarParaBusca = (filtros, cb) => {
  let sql = `
    SELECT p.id, p.usuario_id, p.bio, p.especialidades, p.preco_hora, p.cidade, p.bairro,
           COALESCE(u.foto_url, p.foto_url) as foto_url, p.telefone, u.nome
    FROM perfil_cuidadores p
    JOIN usuarios u ON u.usuario_id = p.usuario_id
    WHERE p.disponivel_busca = 1
      AND p.status = 'aprovado'
  `;
  const params = [];

  if (filtros.especialidade && filtros.especialidade.trim()) {
    sql += " AND p.especialidades LIKE ?";
    params.push("%" + filtros.especialidade.trim() + "%");
  }
  if (filtros.cidade && filtros.cidade.trim()) {
    sql += " AND LOWER(TRIM(p.cidade)) LIKE LOWER(?)";
    params.push("%" + filtros.cidade.trim() + "%");
  }
  if (filtros.bairro && filtros.bairro.trim()) {
    sql += " AND LOWER(TRIM(p.bairro)) LIKE LOWER(?)";
    params.push("%" + filtros.bairro.trim() + "%");
  }

  sql += " ORDER BY u.nome ASC";

  db.query(sql, params, (err, results) => {
    if (err) return cb(err);
    const list = (results || []).map((row) => {
      if (row.especialidades && typeof row.especialidades === "string") {
        try {
          row.especialidades = JSON.parse(row.especialidades);
        } catch {
          row.especialidades = [];
        }
      }
      return row;
    });
    cb(null, list);
  });
};
