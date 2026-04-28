import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { cadastro, login, perfil, patchUsuario, alterarSenha, salvarPushTokenCtrl, uploadFoto } from "../controllers/usuarioController.js";
import middlewareAutenticacao from "../middleware/middlewareAutenticacao.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../../uploads"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    cb(null, `usuario_${req.params.id}_${Date.now()}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

const router = express.Router();
router.post("/cadastro", cadastro);
router.post("/login", login);
router.get("/perfil/:id", middlewareAutenticacao, perfil);
router.patch("/seguranca/senha", middlewareAutenticacao, alterarSenha);
router.patch("/:id", middlewareAutenticacao, patchUsuario);
router.post("/:id/foto", middlewareAutenticacao, upload.single("foto"), uploadFoto);
router.post("/push-token", middlewareAutenticacao, salvarPushTokenCtrl);
export default router;
