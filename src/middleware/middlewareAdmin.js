import middlewareAutenticacao from "./middlewareAutenticacao.js";

export function middlewareAdmin(req, res, next) {
  if (req.user?.tipo !== "admin")
    return res.status(403).json({ message: "Acesso restrito a administradores." });
  next();
}

export function autenticacaoAdmin(req, res, next) {
  middlewareAutenticacao(req, res, () => middlewareAdmin(req, res, next));
}
