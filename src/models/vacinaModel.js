import db from "../config/db.js";

const Vacina = {
  criar: (dados, callback) => {
    const query = `
      INSERT INTO vacinas (paciente_id, nome_vacina, data_aplicacao, unidade_saude)
      VALUES (?, ?, ?, ?)
    `;
    db.query(
      query,
      [dados.paciente_id, dados.nome_vacina, dados.data_aplicacao, dados.unidade_saude],
      callback
    );
  },

  listarPorPaciente: (paciente_id, callback) => {
    const query = "SELECT * FROM vacinas WHERE paciente_id = ? ORDER BY data_aplicacao DESC";
    db.query(query, [paciente_id], callback);
  },

  deletar: (id, callback) => {
    const query = "DELETE FROM vacinas WHERE id = ?";
    db.query(query, [id], callback);
  }
};

export default Vacina;