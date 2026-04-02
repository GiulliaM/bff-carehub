import express from "express";
import { cadastrarVacina, buscarVacinas } from "../controllers/vacinaController.js";
import { middlewareAutenticacao } from "../middlewares/auth.js"; // Protegendo a rota

const router = express.Router();

// Rota para cadastrar (POST)
router.post("/", middlewareAutenticacao, cadastrarVacina);

// Rota para listar vacinas de um paciente (GET)
router.get("/:paciente_id", middlewareAutenticacao, buscarVacinas);

export default router;