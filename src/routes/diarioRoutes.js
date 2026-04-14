import express from "express";
import { criarRegistro, buscarRegistros, excluirRegistro, atualizarRegistro } from "../controllers/diarioController.js";
import middlewareAutenticacao from "../middleware/middlewareAutenticacao.js";
const router = express.Router();
router.post("/", middlewareAutenticacao, criarRegistro);
router.get("/", middlewareAutenticacao, buscarRegistros);
router.patch("/:id", middlewareAutenticacao, atualizarRegistro);
router.delete("/:id", middlewareAutenticacao, excluirRegistro);
export default router;
