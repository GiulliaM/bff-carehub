import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import pacienteRoutes from "./routes/pacienteRoutes.js";
import tarefaRoutes from "./routes/tarefaRoutes.js";
import medicamentoRoutes from "./routes/medicamentoRoutes.js";
import diarioRoutes from "./routes/diarioRoutes.js";
import cuidadorRoutes from "./routes/cuidadorRoutes.js";
import vinculoRoutes from "./routes/vinculoRoutes.js";
import grupoCuidadoRoutes from "./routes/grupoCuidadoRoutes.js";
import artigoRoutes from "./routes/artigoRoutes.js";
import vacinaRoutes from "./routes/vacinaRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import middlewareAutenticacao from "./middleware/middlewareAutenticacao.js";
import middlewareCuidadorAprovado from "./middleware/middlewareCuidadorAprovado.js";

const app = express();

// barra cuidador nao-aprovado nas rotas de dados (familiar/admin passam direto)
const exigirCuidadorAprovado = [middlewareAutenticacao, middlewareCuidadorAprovado];
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/pacientes", exigirCuidadorAprovado, pacienteRoutes);
app.use("/api/tarefas", exigirCuidadorAprovado, tarefaRoutes);
app.use("/api/medicamentos", exigirCuidadorAprovado, medicamentoRoutes);
app.use("/api/diario", exigirCuidadorAprovado, diarioRoutes);
app.use("/api/cuidador", cuidadorRoutes);
app.use("/api/cuidadores", cuidadorRoutes);
app.use("/api/vinculos", exigirCuidadorAprovado, vinculoRoutes);
app.use("/api/grupo", exigirCuidadorAprovado, grupoCuidadoRoutes);
app.use("/api/artigos", artigoRoutes);
app.use("/api/vacinas", exigirCuidadorAprovado, vacinaRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.json({ message: "CareHub API OK", version: "2.0.0" }));

// Rota não encontrada (404)
app.use((req, res) => {
  res.status(404).json({ message: `Rota não encontrada: ${req.method} ${req.originalUrl}` });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ message: "Foto muito grande. O limite é 50 MB." });
  }
  console.error(`${req.method} ${req.originalUrl}:`, err.message);
  console.error(err.stack);
  res.status(500).json({
    message: "Erro interno do servidor.",
    detail: process.env.NODE_ENV !== "production" ? err.message : undefined,
  });
});

export default app;
