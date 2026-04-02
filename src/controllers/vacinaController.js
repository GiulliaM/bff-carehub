import Vacina from "../models/vacinaModel.js";

export const cadastrarVacina = (req, res) => {
  const { paciente_id, nome_vacina, data_aplicacao, unidade_saude } = req.body;

  // Validação simples
  if (!paciente_id || !nome_vacina || !data_aplicacao) {
    return res.status(400).json({ message: "Campos obrigatórios: paciente, nome e data." });
  }

  Vacina.criar({ paciente_id, nome_vacina, data_aplicacao, unidade_saude }, (err, result) => {
    if (err) {
      console.error("Erro ao salvar vacina:", err);
      return res.status(500).json({ error: "Erro ao salvar no banco de dados." });
    }
    res.status(201).json({ message: "Vacina registrada com sucesso!", id: result.insertId });
  });
};

export const buscarVacinas = (req, res) => {
  const { paciente_id } = req.params;

  Vacina.listarPorPaciente(paciente_id, (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar vacinas." });
    res.json(results);
  });
};