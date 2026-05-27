import express from "express";
import { cadastrarVacina, buscarVacinas } from "../controllers/vacinaController.js";
import middlewareAutenticacao from "../middleware/middlewareAutenticacao.js"; 

const router = express.Router();

router.post("/", middlewareAutenticacao, cadastrarVacina);
router.get("/:paciente_id", middlewareAutenticacao, buscarVacinas);

export default router;