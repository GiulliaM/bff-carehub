import { criarConvite, getConviteAtivoPorPaciente, aceitarConvite as aceitarConviteModel, listarPacientesDoCuidador, desvincularCuidador, desvincularCuidadorDoPaciente } from "../models/vinculoModel.js";
import { pacientePertenceAoUsuario, buscarPacientePorId } from "../models/pacienteModel.js";
import { listarMembrosDoGrupo, usuarioNoGrupo } from "../models/grupoCuidadoModel.js";

/**
 * POST /api/vinculos/gerar-convite
 * Body: { paciente_id }
 * Acesso: apenas dono do paciente (familiar). Gera código 6 dígitos válido por 24h.
 */
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

/**
 * GET /api/vinculos/convite/:paciente_id
 * Retorna o convite ativo do paciente (código e expira_em), se existir.
 * Acesso: dono do paciente.
 */
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

/**
 * POST /api/vinculos/aceitar
 * Body: { codigo }
 * Acesso: apenas tipo cuidador. Aceita o convite e cria vínculo.
 */
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

/**
 * GET /api/vinculos/meus-pacientes
 * Lista pacientes vinculados ao cuidador logado.
 * Acesso: apenas tipo cuidador.
 */
export const buscarMeusPacientes = (req, res) => {
  listarPacientesDoCuidador(req.user.usuario_id, (err, list) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(list || []);
  });
};

/**
 * GET /api/vinculos/cuidadores/:paciente_id
 * Lista cuidadores vinculados ao paciente.
 * Acesso: qualquer membro do grupo de cuidado.
 */
export const buscarCuidadoresDoPaciente = (req, res) => {
  const pacienteId = req.params.paciente_id;
  const usuarioId = req.user.usuario_id;

  usuarioNoGrupo(usuarioId, pacienteId, (err, pertence) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!pertence) return res.status(403).json({ message: "Acesso negado a este paciente" });

    listarMembrosDoGrupo(pacienteId, (err2, membros) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(membros || []);
    });
  });
};

/**
 * DELETE /api/vinculos/:paciente_id
 * Cuidador se desvincula de um paciente.
 * Acesso: cuidador logado.
 */
export const desvincular = (req, res) => {
  const pacienteId = req.params.paciente_id;
  const cuidadorId = req.user.usuario_id;

  desvincularCuidador(cuidadorId, pacienteId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Vínculo não encontrado" });
    res.json({ message: "Desvinculado com sucesso" });
  });
};

/**
 * DELETE /api/vinculos/cuidador/:cuidador_id/paciente/:paciente_id
 * Familiar remove um cuidador do seu paciente.
 * Acesso: dono do paciente (familiar).
 */
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
