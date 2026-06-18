import { buscarPorUsuarioId, salvarOuAtualizarPerfil, listarParaBusca, buscarPorCpf } from "../models/cuidadorModel.js";
import { validarCPF, soDigitosCPF } from "../utils/validarCPF.js";

export const buscarMeuPerfil = (req, res) => {
  if (req.user.tipo !== "cuidador") {
    return res.status(403).json({ message: "Acesso restrito a cuidadores" });
  }
  const usuarioId = req.user.usuario_id;
  buscarPorUsuarioId(usuarioId, (err, perfil) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!perfil) {
      return res.status(200).json(null);
    }
    res.json(perfil);
  });
};

export const salvarMeuPerfil = (req, res) => {
  if (req.user.tipo !== "cuidador") {
    return res.status(403).json({ message: "Acesso restrito a cuidadores" });
  }
  const usuarioId = req.user.usuario_id;
  const data = req.body || {};

  // valida CPF quando enviado: precisa ser valido (digito) e nao pode pertencer a outro cuidador
  if (data.cpf !== undefined && data.cpf !== null && String(data.cpf).trim() !== "") {
    if (!validarCPF(data.cpf)) {
      return res.status(400).json({ message: "CPF inválido. Verifique o número informado." });
    }
    const cpfDigitos = soDigitosCPF(data.cpf);
    buscarPorCpf(cpfDigitos, usuarioId, (errCpf, existente) => {
      if (errCpf) return res.status(500).json({ error: errCpf.message });
      if (existente) {
        return res.status(409).json({ message: "Este CPF já está cadastrado em outra conta." });
      }
      salvarOuAtualizarPerfil(usuarioId, data, (err, perfil) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(perfil);
      });
    });
    return;
  }

  salvarOuAtualizarPerfil(usuarioId, data, (err, perfil) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(perfil);
  });
};

export const buscarCuidadoresRota = (req, res) => {
  if (req.user.tipo !== "familiar") {
    return res.status(403).json({ message: "Acesso restrito a familiares" });
  }
  const filtros = {
    especialidade: req.query.especialidade,
    cidade: req.query.cidade,
    bairro: req.query.bairro,
  };
  listarParaBusca(filtros, (err, list) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(list || []);
  });
};
