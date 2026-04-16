import express from "express";
import {
  buscarMedicamentos,
  buscarMedicamentoPorId,
  criarMedicamentoRota,
  atualizarMedicamentoRota,
  alternarMedicamentoConcluido,
  excluirMedicamento,
  buscarDosesDoDia,
  toggleDose,
  buscarAgendaDoDia,
} from "../controllers/medicamentoController.js";
import middlewareAutenticacao from "../middleware/middlewareAutenticacao.js";

const router = express.Router();

// Rotas específicas primeiro (antes das genéricas com :id/:paciente_id)
router.get("/detalhe/:id", middlewareAutenticacao, buscarMedicamentoPorId);
router.post("/", middlewareAutenticacao, criarMedicamentoRota);
router.patch("/:id/toggle", middlewareAutenticacao, alternarMedicamentoConcluido);
router.patch("/:id/dose", middlewareAutenticacao, toggleDose);
router.delete("/:id", middlewareAutenticacao, excluirMedicamento);
router.patch("/:id", middlewareAutenticacao, atualizarMedicamentoRota);

// Rotas com parâmetros duplos
router.get("/:paciente_id/agenda/:data", middlewareAutenticacao, buscarAgendaDoDia);
router.get("/:paciente_id/doses/:data", middlewareAutenticacao, buscarDosesDoDia);
router.get("/:paciente_id", middlewareAutenticacao, buscarMedicamentos);

export default router;
