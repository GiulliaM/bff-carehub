import db from "../config/db.js";

export const buscarStats = (cb) => {
  const sqlUsuarios = `
    SELECT tipo, COUNT(*) as total
    FROM usuarios
    WHERE tipo IN ('familiar','cuidador')
    GROUP BY tipo
  `;
  const sqlStatus = `
    SELECT status, COUNT(*) as total
    FROM perfil_cuidadores
    GROUP BY status
  `;
  db.query(sqlUsuarios, (err, rowsUsuarios) => {
    if (err) return cb(err);
    db.query(sqlStatus, (err2, rowsStatus) => {
      if (err2) return cb(err2);
      const stats = {
        total_usuarios: 0,
        total_familiares: 0,
        total_cuidadores: 0,
        pendentes: 0,
        aprovados: 0,
        rejeitados: 0,
      };
      (rowsUsuarios || []).forEach((r) => {
        if (r.tipo === "familiar") stats.total_familiares = Number(r.total);
        if (r.tipo === "cuidador") stats.total_cuidadores = Number(r.total);
        stats.total_usuarios += Number(r.total);
      });
      (rowsStatus || []).forEach((r) => {
        if (r.status === "pendente") stats.pendentes = Number(r.total);
        if (r.status === "aprovado") stats.aprovados = Number(r.total);
        if (r.status === "rejeitado") stats.rejeitados = Number(r.total);
      });
      cb(null, stats);
    });
  });
};

export const listarUsuarios = (filtros, cb) => {
  let sql = `
    SELECT usuario_id, nome, email, tipo, telefone, foto_url, created_at
    FROM usuarios
    WHERE tipo != 'admin'
  `;
  const params = [];
  if (filtros.tipo && ["familiar", "cuidador"].includes(filtros.tipo)) {
    sql += " AND tipo = ?";
    params.push(filtros.tipo);
  }
  sql += " ORDER BY created_at DESC";
  db.query(sql, params, (err, results) => {
    if (err) return cb(err);
    cb(null, results || []);
  });
};

export const listarCuidadores = (status, cb) => {
  let sql = `
    SELECT
      p.id, p.usuario_id, p.bio, p.especialidades, p.preco_hora,
      p.cidade, p.bairro, p.telefone, p.cpf, p.status, p.motivo_rejeicao,
      COALESCE(u.foto_url, p.foto_url) as foto_url,
      u.nome, u.email, u.created_at
    FROM perfil_cuidadores p
    JOIN usuarios u ON u.usuario_id = p.usuario_id
  `;
  const params = [];
  if (status && ["pendente", "aprovado", "rejeitado"].includes(status)) {
    sql += " WHERE p.status = ?";
    params.push(status);
  }
  sql += " ORDER BY p.status ASC, u.nome ASC";
  db.query(sql, params, (err, results) => {
    if (err) return cb(err);
    const list = (results || []).map((row) => {
      if (row.especialidades && typeof row.especialidades === "string") {
        try { row.especialidades = JSON.parse(row.especialidades); }
        catch { row.especialidades = []; }
      }
      return row;
    });
    cb(null, list);
  });
};

export const buscarCuidadorDetalhado = (usuarioId, cb) => {
  const sql = `
    SELECT
      p.id, p.usuario_id, p.bio, p.especialidades, p.preco_hora,
      p.cidade, p.bairro, p.telefone, p.cpf, p.status, p.motivo_rejeicao,
      p.disponivel_busca, p.updated_at,
      COALESCE(u.foto_url, p.foto_url) as foto_url,
      u.nome, u.email, u.telefone as telefone_usuario, u.created_at
    FROM perfil_cuidadores p
    JOIN usuarios u ON u.usuario_id = p.usuario_id
    WHERE p.usuario_id = ?
  `;
  db.query(sql, [usuarioId], (err, results) => {
    if (err) return cb(err);
    const row = results && results[0];
    if (!row) return cb(null, null);
    if (row.especialidades && typeof row.especialidades === "string") {
      try { row.especialidades = JSON.parse(row.especialidades); }
      catch { row.especialidades = []; }
    }
    cb(null, row);
  });
};

export const atualizarStatusCuidador = (usuarioId, status, motivo, cb) => {
  const sql = `
    UPDATE perfil_cuidadores
    SET status = ?, motivo_rejeicao = ?
    WHERE usuario_id = ?
  `;
  db.query(sql, [status, motivo || null, usuarioId], (err, result) => {
    if (err) return cb(err);
    if (result.affectedRows === 0) return cb(null, false);
    cb(null, true);
  });
};
