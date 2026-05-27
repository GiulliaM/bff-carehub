import db from "../config/db.js";

export const criarMedicamento = (data, callback) => {
  const {
    nome, dosagem, mg, qtd_comprimidos, horarios,
    concluido, inicio, duracao_days, uso_continuo, paciente_id,
    tipo_agendamento, intervalo_horas, data_fim, dias_semana,
    grupo_repeticao, local_aplicacao,
  } = data;

  const horariosStr = Array.isArray(horarios) ? JSON.stringify(horarios) : horarios;

  const sql = `
    INSERT INTO medicamentos
    (nome, dosagem, mg, qtd_comprimidos, horarios, concluido, inicio, duracao_days, uso_continuo, paciente_id,
     tipo_agendamento, intervalo_horas, data_fim, dias_semana, grupo_repeticao, local_aplicacao)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    nome, dosagem, mg || null, qtd_comprimidos || null,
    horariosStr, concluido, inicio, duracao_days, uso_continuo, paciente_id,
    tipo_agendamento || "manual", intervalo_horas, data_fim, dias_semana,
    grupo_repeticao || null, local_aplicacao || null,
  ], callback);
};

const COLUNAS_PERMITIDAS = [
  "nome", "dosagem", "mg", "qtd_comprimidos", "horarios", "concluido",
  "hora_conclusao", "inicio", "duracao_days", "uso_continuo",
  "tipo_agendamento", "intervalo_horas", "data_fim", "dias_semana", "local_aplicacao",
];

export const atualizarMedicamento = (id, data, callback) => {
  const keys = Object.keys(data).filter((k) => COLUNAS_PERMITIDAS.includes(k));
  if (keys.length === 0) return callback(null, { affectedRows: 0 });

  if (data.horarios && Array.isArray(data.horarios)) {
    data = { ...data, horarios: JSON.stringify(data.horarios) };
  }

  const fields = keys.map((key) => `${key} = ?`).join(", ");
  const values = keys.map((key) => data[key]);

  const sql = `UPDATE medicamentos SET ${fields} WHERE medicamento_id = ? LIMIT 1`;
  db.query(sql, [...values, id], callback);
};

export const alternarMedicamento = (id, concluido, callback) => {
  const horaConclusao = concluido
    ? new Date().toISOString().slice(0, 19).replace("T", " ")
    : null;
  db.query(
    "UPDATE medicamentos SET concluido = ?, hora_conclusao = ? WHERE medicamento_id = ?",
    [concluido ? 1 : 0, horaConclusao, id],
    callback
  );
};

// atualiza em lote, ignora os ja concluidos
export const atualizarGrupo = (grupoRepeticao, medId, data, callback) => {
  const keys = Object.keys(data).filter((k) => COLUNAS_PERMITIDAS.includes(k));
  if (keys.length === 0 || !grupoRepeticao) return callback(null, { affectedRows: 0 });

  if (data.horarios && Array.isArray(data.horarios)) {
    data = { ...data, horarios: JSON.stringify(data.horarios) };
  }

  const fields = keys.map((key) => `${key} = ?`).join(", ");
  const values = keys.map((key) => data[key]);

  const sql = `UPDATE medicamentos SET ${fields} WHERE grupo_repeticao = ? AND concluido = 0 AND medicamento_id >= ?`;
  db.query(sql, [...values, grupoRepeticao, medId], callback);
};

export default {
  criarMedicamento,
  atualizarMedicamento,
  alternarMedicamento,
  atualizarGrupo,
};
