import {
  buscarStats,
  listarUsuarios,
  listarFamiliaresComPacientes,
  listarCuidadores,
  buscarCuidadorDetalhado,
  atualizarStatusCuidador,
} from "../models/adminModel.js";

export const stats = (req, res) => {
  buscarStats((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};

export const listarUsuariosAdmin = (req, res) => {
  const filtros = { tipo: req.query.tipo };
  listarUsuarios(filtros, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};

export const listarFamiliaresAdmin = (req, res) => {
  listarFamiliaresComPacientes((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};

export const listarCuidadoresAdmin = (req, res) => {
  const status = req.query.status || null;
  listarCuidadores(status, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};

export const detalhesCuidador = (req, res) => {
  const usuarioId = req.params.id;
  buscarCuidadorDetalhado(usuarioId, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!data) return res.status(404).json({ message: "Perfil não encontrado." });
    res.json(data);
  });
};

export const atualizarStatus = (req, res) => {
  const usuarioId = req.params.id;
  const { status, motivo } = req.body || {};
  if (!["aprovado", "rejeitado"].includes(status)) {
    return res.status(400).json({ message: "Status inválido. Use 'aprovado' ou 'rejeitado'." });
  }
  if (status === "rejeitado" && !motivo?.trim()) {
    return res.status(400).json({ message: "Informe o motivo da rejeição." });
  }
  atualizarStatusCuidador(usuarioId, status, motivo || null, (err, ok) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!ok) return res.status(404).json({ message: "Cuidador não encontrado." });
    res.json({ message: `Perfil ${status} com sucesso.` });
  });
};
