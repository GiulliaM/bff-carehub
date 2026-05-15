import express from "express";
import { criarArtigo, listarArtigos, buscarArtigoPorId, deletarArtigo } from "../controllers/artigoController.js";
import middlewareAutenticacao from "../middleware/middlewareAutenticacao.js";

const router = express.Router();

router.get("/", middlewareAutenticacao, listarArtigos);
router.get("/:id", middlewareAutenticacao, buscarArtigoPorId);

router.post("/", middlewareAutenticacao, criarArtigo);
router.delete("/:id", middlewareAutenticacao, deletarArtigo);

export default router;