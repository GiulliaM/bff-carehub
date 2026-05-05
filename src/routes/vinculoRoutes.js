import express from "express";
import middlewareAutenticacao from "../middleware/middlewareAutenticacao.js";
import {
  gerarConvite,
  buscarConvite,
  aceitarConvite,
  buscarMeusPacientes,
  desvincular,
  removerCuidador,
} from "../controllers/vinculoController.js";

const router = express.Router();

router.post("/gerar-convite", middlewareAutenticacao, gerarConvite);
router.get("/convite/:paciente_id", middlewareAutenticacao, buscarConvite);
router.post("/aceitar", middlewareAutenticacao, aceitarConvite);
router.get("/meus-pacientes", middlewareAutenticacao, buscarMeusPacientes);
router.delete("/cuidador/:cuidador_id/paciente/:paciente_id", middlewareAutenticacao, removerCuidador);
router.delete("/:paciente_id", middlewareAutenticacao, desvincular);

export default router;
