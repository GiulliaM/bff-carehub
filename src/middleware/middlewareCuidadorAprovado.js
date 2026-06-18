import { buscarStatus } from "../models/cuidadorModel.js";

// Barra cuidador que ainda nao foi aprovado pelo admin.
// Familiares e admins passam direto. Deve rodar DEPOIS do middlewareAutenticacao.
export default function middlewareCuidadorAprovado(req, res, next) {
  if (req.user?.tipo !== "cuidador") return next();

  buscarStatus(req.user.usuario_id, (err, status) => {
    if (err) return res.status(500).json({ message: "Erro ao verificar status do perfil." });
    if (status === "aprovado") return next();

    return res.status(403).json({
      code: "CUIDADOR_NAO_APROVADO",
      status: status || "incompleto",
      message:
        status === "rejeitado"
          ? "Seu perfil foi rejeitado. Ajuste os dados e reenvie para análise."
          : "Seu perfil está em análise. Aguarde a aprovação do administrador.",
    });
  });
}
