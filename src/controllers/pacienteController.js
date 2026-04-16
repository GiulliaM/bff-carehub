import {
  criarPaciente as criarPacienteModel,
  listarPacientesPorUsuario,
  buscarPacientePorId as buscarPacientePorIdModel,
  atualizarPaciente,
  pacientePertenceAoUsuario,
  usuarioEhDono,
  deletarPaciente as deletarPacienteModel,
} from "../models/pacienteModel.js";

export const atualizarPacienteRota = (req, res) => {
  const id = req.params.id;
  const changes = { ...req.body };
  const usuarioId = req.user?.usuario_id;

  // Serializar categorias_cuidado para JSON string se vier como array
  if (Array.isArray(changes.categorias_cuidado)) {
    changes.categorias_cuidado = JSON.stringify(changes.categorias_cuidado);
  }

  buscarPacientePorIdModel(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results || results.length === 0) return res.status(404).json({ message: "Paciente nao encontrado" });

    pacientePertenceAoUsuario(id, usuarioId, (err2, pode) => {
      if (err2) return res.status(500).json({ error: err2.message });
      if (!pode) return res.status(403).json({ message: "Acesso negado a este paciente" });

      atualizarPaciente(id, changes, (err3) => {
        if (err3) return res.status(500).json({ error: err3.message });
        res.json({ message: "Paciente atualizado" });
      });
    });
  });
};

export const criarPaciente = (req, res) => {
  const p = { ...req.body };
  p.criado_por = req.user.usuario_id;

  if (Array.isArray(p.categorias_cuidado)) {
    p.categorias_cuidado = JSON.stringify(p.categorias_cuidado);
  }

  criarPacienteModel(p, (err, r) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ paciente_id: r.insertId });
  });
};

export const buscarPacientes = (req, res) => {
  listarPacientesPorUsuario(req.user.usuario_id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results || []);
  });
};

export const deletarPacienteRota = (req, res) => {
  const id = req.params.id;
  const usuarioId = req.user?.usuario_id;

  buscarPacientePorIdModel(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results || results.length === 0) return res.status(404).json({ message: "Paciente nao encontrado" });

    usuarioEhDono(id, usuarioId, (err2, ehDono) => {
      if (err2) return res.status(500).json({ error: err2.message });
      if (!ehDono) return res.status(403).json({ message: "Apenas o responsavel principal pode excluir este paciente." });

      deletarPacienteModel(id, (err3) => {
        if (err3) return res.status(500).json({ error: err3.message });
        res.json({ message: "Paciente excluido com sucesso." });
      });
    });
  });
};

export const buscarPacientePorId = (req, res) => {
  const id = req.params.id;
  const usuarioId = req.user?.usuario_id;

  buscarPacientePorIdModel(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results || results.length === 0) return res.status(404).json({ message: "Paciente nao encontrado" });

    const paciente = results[0];
    pacientePertenceAoUsuario(id, usuarioId, (err2, pode) => {
      if (err2) return res.status(500).json({ error: err2.message });
      if (!pode) return res.status(403).json({ message: "Acesso negado a este paciente" });
      res.json(paciente);
    });
  });
};
