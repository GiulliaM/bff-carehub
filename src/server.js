import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const envPathRoot = path.resolve(__dirname, "../.env");
const envPathSrc  = path.resolve(__dirname, ".env");

const resultRoot = dotenv.config({ path: envPathRoot });

if (resultRoot.error) {
  const resultSrc = dotenv.config({ path: envPathSrc });
  if (resultSrc.error) {
    console.warn("aviso: .env nao encontrado, usando variaveis de ambiente do sistema");
  }
}

// app importado depois do dotenv pra garantir que process.env ta preenchido
const { default: app } = await import("./app.js");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
