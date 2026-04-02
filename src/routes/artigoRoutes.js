import express from "express";
import artigoController from "../controllers/artigoController.js";
import middlewareAutenticacao from "../middleware/middlewareAutenticacao.js";

const router = express.Router();

router.get("/", middlewareAutenticacao, artigoController.listarArtigos);
router.get("/:id", middlewareAutenticacao, artigoController.buscarArtigoPorId);

router.post("/", middlewareAutenticacao, artigoController.criarArtigo);
router.delete("/:id", middlewareAutenticacao, artigoController.deletarArtigo);

export default router;