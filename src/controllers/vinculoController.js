import { criarConvite, getConviteAtivoPorPaciente, aceitarConvite as aceitarConviteModel, listarPacientesDoCuidador, desvincularCuidador, desvincularCuidadorDoPaciente } from "../models/vinculoModel.js";
import { pacientePertenceAoUsuario, buscarPacientePorId } from "../models/pacienteModel.js";
import { listarMembrosDoGrupo, usuarioNoGrupo } from "../models/grupoCuidadoModel.js";

export const gerarConvite = (req, res) => {
  const pacienteId = req.body?.paciente_id;
  const usuarioId = req.user.usuario_id;

  if (!pacienteId) return res.status(400).json({ message: "paciente_id é obrigatório" });

  pacientePertenceAoUsuario(pacienteId, usuarioId, (err, pode) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!pode) return res.status(403).json({ message: "Acesso negado a este paciente" });

    criarConvite(pacienteId, usuarioId, (err2, result) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json(result);
    });
  });
};

export const buscarConvite = (req, res) => {
  const pacienteId = req.params.paciente_id;
  const usuarioId = req.user.usuario_id;

  pacientePertenceAoUsuario(pacienteId, usuarioId, (err, pode) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!pode) return res.status(403).json({ message: "Acesso negado" });

    getConviteAtivoPorPaciente(pacienteId, (err2, convite) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(convite || {});
    });
  });
};

export const aceitarConvite = (req, res) => {
  const codigo = req.body?.codigo;
  const cuidadorId = req.user.usuario_id;

  if (!codigo) return res.status(400).json({ message: "Código é obrigatório" });

  aceitarConviteModel(codigo, cuidadorId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.error) return res.status(400).json({ message: result.error });

    buscarPacientePorId(result.paciente_id, (err2, rows) => {
      if (err2 || !rows?.length) return res.json({ message: "Vínculo criado", paciente_id: result.paciente_id });
      res.json({ message: "Vínculo criado com sucesso", paciente: rows[0] });
    });
  });
};

export const buscarMeusPacientes = (req, res) => {
  listarPacientesDoCuidador(req.user.usuario_id, (err, list) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(list || []);
  });
};

export const buscarCuidadoresDoPaciente = (req, res) => {
  const pacienteId = req.params.paciente_id;
  const usuarioId = req.user.usuario_id;

  pacientePertenceAoUsuario(pacienteId, usuarioId, (err, ehDono) => {
    if (err) return res.status(500).json({ error: err.message });
    if (ehDono) {
      return listarMembrosDoGrupo(pacienteId, (err2, membros) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json(membros || []);
      });
    }

    usuarioNoGrupo(usuarioId, pacienteId, (err3, pertence) => {
      if (err3) return res.status(500).json({ error: err3.message });
      if (!pertence) return res.status(403).json({ message: "Acesso negado a este paciente" });

      listarMembrosDoGrupo(pacienteId, (err4, membros) => {
        if (err4) return res.status(500).json({ error: err4.message });
        res.json(membros || []);
      });
    });
  });
};

export const desvincular = (req, res) => {
  const pacienteId = req.params.paciente_id;
  const cuidadorId = req.user.usuario_id;

  desvincularCuidador(cuidadorId, pacienteId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Vínculo não encontrado" });
    res.json({ message: "Desvinculado com sucesso" });
  });
};

export const removerCuidador = (req, res) => {
  const { cuidador_id, paciente_id } = req.params;
  const usuarioId = req.user.usuario_id;

  pacientePertenceAoUsuario(paciente_id, usuarioId, (err, pode) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!pode) return res.status(403).json({ message: "Acesso negado a este paciente" });

    desvincularCuidadorDoPaciente(cuidador_id, paciente_id, (err2, result) => {
      if (err2) return res.status(500).json({ error: err2.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Vínculo não encontrado" });
      res.json({ message: "Cuidador removido com sucesso" });
    });
  });
};
