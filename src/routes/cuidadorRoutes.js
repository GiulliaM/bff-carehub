import express from "express";
import middlewareAutenticacao from "../middleware/middlewareAutenticacao.js";
import { buscarMeuPerfil, salvarMeuPerfil, buscarCuidadoresRota } from "../controllers/cuidadorController.js";

const router = express.Router();

router.get("/perfil", middlewareAutenticacao, buscarMeuPerfil);
router.post("/perfil", middlewareAutenticacao, salvarMeuPerfil);
router.get("/busca", middlewareAutenticacao, buscarCuidadoresRota);

export default router;
