import express from "express";
import { autenticacaoAdmin } from "../middleware/middlewareAdmin.js";
import {
  stats,
  listarUsuariosAdmin,
  listarCuidadoresAdmin,
  detalhesCuidador,
  atualizarStatus,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", autenticacaoAdmin, stats);
router.get("/usuarios", autenticacaoAdmin, listarUsuariosAdmin);
router.get("/cuidadores", autenticacaoAdmin, listarCuidadoresAdmin);
router.get("/cuidadores/:id", autenticacaoAdmin, detalhesCuidador);
router.patch("/cuidadores/:id/status", autenticacaoAdmin, atualizarStatus);

export default router;
