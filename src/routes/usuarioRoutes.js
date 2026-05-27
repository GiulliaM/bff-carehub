import express from "express";
import multer from "multer";
import { cadastro, login, perfil, patchUsuario, alterarSenha, salvarPushTokenCtrl, uploadFoto } from "../controllers/usuarioController.js";
import middlewareAutenticacao from "../middleware/middlewareAutenticacao.js";

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

const router = express.Router();
router.post("/cadastro", cadastro);
router.post("/login", login);
router.get("/perfil/:id", middlewareAutenticacao, perfil);
router.patch("/seguranca/senha", middlewareAutenticacao, alterarSenha);
router.patch("/:id", middlewareAutenticacao, patchUsuario);
router.post("/:id/foto", middlewareAutenticacao, upload.single("foto"), uploadFoto);
router.post("/push-token", middlewareAutenticacao, salvarPushTokenCtrl);
export default router;
