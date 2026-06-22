import db from "../config/db.js";

export const usuarioPodeEditarPaciente = (pacienteId, usuarioId, cb) => {
  db.query(
    "SELECT 1 FROM grupo_cuidado WHERE paciente_id = ? AND usuario_id = ? AND status = 'Ativo'",
    [pacienteId, usuarioId],
    (err, results) => {
      if (err) return cb(err);
      cb(null, results && results.length > 0);
    }
  );
};

// inclui nome do ultimo editor via JOIN
export const buscarPorPacienteId = (pacienteId, cb) => {
  const sql = `
    SELECT h.*, u.nome AS ultima_alteracao_nome
    FROM historico_medico h
    LEFT JOIN usuarios u ON u.usuario_id = h.ultima_alteracao_por
    WHERE h.paciente_id = ?
  `;
  db.query(sql, [pacienteId], (err, results) => {
    if (err) return cb(err);
    let row = results && results[0];
    if (row && row.contatos_emergencia && typeof row.contatos_emergencia === "string") {
      try {
        row.contatos_emergencia = JSON.parse(row.contatos_emergencia);
      } catch {
        row.contatos_emergencia = [];
      }
    }
    cb(null, row || null);
  });
};

const COLUNAS = [
  "condicoes_cronicas",
  "alergias",
  "historico_cirurgico",
  "tipo_sanguineo",
  "plano_saude_nome",
  "plano_saude_numero",
  "contatos_emergencia",
  "medico_responsavel",
  "telefone_medico",
  "capacidade_funcional",
  "observacoes_gerais",
];

// upsert — atualiza ultima_alteracao_por e ultima_alteracao_em
export const salvarOuAtualizar = (pacienteId, usuarioId, data, cb) => {
  const allowed = {};
  COLUNAS.forEach((col) => {
    if (data[col] !== undefined) allowed[col] = data[col];
  });
  if (allowed.contatos_emergencia && Array.isArray(allowed.contatos_emergencia)) {
    allowed.contatos_emergencia = JSON.stringify(allowed.contatos_emergencia);
  }

  buscarPorPacienteId(pacienteId, (err, existing) => {
    if (err) return cb(err);
    // O horario e gravado em hora de Brasilia direto no SQL, via
    // CONVERT_TZ(UTC_TIMESTAMP(), '+00:00', '-03:00'). Assim nao depende do
    // fuso do SO da VPS (que esta em UTC+2) nem de como o mysql2 serializa um
    // Date — que estava gravando UTC e a leitura ('-03:00') adiantava 3h no app.
    // Offsets numericos no CONVERT_TZ nao exigem as tabelas de timezone do MySQL.
    const EXPR_AGORA_BR = "CONVERT_TZ(UTC_TIMESTAMP(), '+00:00', '-03:00')";
    allowed.ultima_alteracao_por = usuarioId;

    if (existing) {
      const keys = Object.keys(allowed);
      const setClause = keys.map((k) => `${k} = ?`).join(", ");
      const values = keys.map((k) => allowed[k]);
      values.push(pacienteId);
      const sql = `UPDATE historico_medico SET ${setClause}, ultima_alteracao_em = ${EXPR_AGORA_BR} WHERE paciente_id = ?`;
      db.query(sql, values, (err2) => {
        if (err2) return cb(err2);
        buscarPorPacienteId(pacienteId, cb);
      });
    } else {
      const keys = Object.keys(allowed);
      const cols = ["paciente_id", ...keys, "ultima_alteracao_em"];
      const placeholders = ["?", ...keys.map(() => "?"), EXPR_AGORA_BR];
      const values = [pacienteId, ...keys.map((k) => allowed[k])];
      const sql = `INSERT INTO historico_medico (${cols.join(", ")}) VALUES (${placeholders.join(", ")})`;
      db.query(sql, values, (err2) => {
        if (err2) return cb(err2);
        buscarPorPacienteId(pacienteId, cb);
      });
    }
  });
};
