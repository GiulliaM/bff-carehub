import { criarUsuario, buscarPorEmail, buscarPorId, atualizarUsuario, buscarSenhaPorId, atualizarSenha, salvarPushToken } from "../models/usuarioModel.js";
import { salvarOuAtualizarPerfil } from "../models/cuidadorModel.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const cadastro = (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  if (!nome || !email || !senha || !tipo) {
    return res.status(400).json({ message: "Dados inválidos: nome, email, senha e tipo são obrigatórios" });
  }

  const tiposValidos = ["familiar", "cuidador"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({ message: `Tipo inválido. Use: ${tiposValidos.join(", ")}` });
  }

  if (!process.env.JWT_SECRET) {
    console.error("[ERRO CRÍTICO] JWT_SECRET não está definido no .env");
    return res.status(500).json({ message: "Erro de configuração do servidor. Contate o administrador." });
  }

  buscarPorEmail(email, async (err, results) => {
    if (err) {
      console.error("[cadastro] Erro ao buscar email:", err.message);
      return res.status(500).json({ message: "Erro ao verificar o e-mail. Tente novamente." });
    }
    if (results.length > 0) {
      return res.status(409).json({ message: "Este e-mail já está cadastrado." });
    }

    let hash;
    try {
      hash = await bcrypt.hash(senha, 10);
    } catch (hashErr) {
      console.error("[cadastro] Erro ao hashear senha:", hashErr.message);
      return res.status(500).json({ message: "Erro interno ao processar senha." });
    }

    criarUsuario({ nome, email, senha_hash: hash, tipo }, (err2, result) => {
      if (err2) {
        console.error("[cadastro] Erro ao criar usuário no banco:", err2.message);
        return res.status(500).json({ message: "Erro ao criar usuário no banco de dados.", detail: err2.message });
      }

      try {
        const payload = { usuario_id: result.insertId, nome, email, tipo };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({
          usuario: { usuario_id: result.insertId, nome, email, tipo },
          token,
        });
      } catch (jwtErr) {
        console.error("[cadastro] Erro ao gerar token JWT:", jwtErr.message);
        return res.status(500).json({ message: "Usuário criado, mas erro ao gerar token. Faça login." });
      }
    });
  });
};

export const login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
  }

  if (!process.env.JWT_SECRET) {
    console.error("[ERRO CRÍTICO] JWT_SECRET não está definido no .env");
    return res.status(500).json({ message: "Erro de configuração do servidor." });
  }

  buscarPorEmail(email, async (err, results) => {
    if (err) {
      console.error("[login] Erro ao buscar usuário:", err.message);
      return res.status(500).json({ message: "Erro ao realizar login. Tente novamente." });
    }
    if (!results || results.length === 0) {
      return res.status(401).json({ message: "E-mail ou senha incorretos." });
    }

    const user = results[0];

    let valid = false;
    try {
      valid = await bcrypt.compare(senha, user.senha_hash);
    } catch (bcryptErr) {
      console.error("[login] Erro ao comparar senha:", bcryptErr.message);
      return res.status(500).json({ message: "Erro interno ao verificar senha." });
    }

    if (!valid) return res.status(401).json({ message: "E-mail ou senha incorretos." });

    try {
      const usuarioCompleto = {
        usuario_id: user.usuario_id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
        telefone: user.telefone || null,
        foto_url: user.foto_url || null,
      };
      const tokenPayload = { usuario_id: user.usuario_id, nome: user.nome, email: user.email, tipo: user.tipo };
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.json({ usuario: usuarioCompleto, token });
    } catch (jwtErr) {
      console.error("[login] Erro ao gerar token:", jwtErr.message);
      return res.status(500).json({ message: "Erro ao gerar token de acesso." });
    }
  });
};

export const perfil = (req, res) => {
  const id = req.params.id;
  const usuarioId = req.user?.usuario_id;
  if (Number(id) !== Number(usuarioId)) {
    return res.status(403).json({ message: "Acesso negado ao perfil de outro usuário" });
  }

  buscarPorId(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results || results.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(results[0]);
  });
};

export const patchUsuario = (req, res) => {
  const id = req.params.id;
  const usuarioId = req.user?.usuario_id;
  if (Number(id) !== Number(usuarioId)) {
    return res.status(403).json({ message: "Não é possível editar outro usuário" });
  }
  const changes = req.body;

  atualizarUsuario(id, changes, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    if (req.user?.tipo === "cuidador" && changes.telefone !== undefined) {
      salvarOuAtualizarPerfil(Number(id), { telefone: changes.telefone }, () => {});
    }
    res.json({ message: "Usuário atualizado" });
  });
};

export const salvarPushTokenCtrl = (req, res) => {
  const { push_token } = req.body;
  if (!push_token) return res.status(400).json({ message: "push_token obrigatório" });
  salvarPushToken(req.user.usuario_id, push_token, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
};

export const uploadFoto = (req, res) => {
  const id = req.params.id;
  const usuarioId = req.user?.usuario_id;
  if (Number(id) !== Number(usuarioId)) {
    return res.status(403).json({ message: "Não é possível alterar foto de outro usuário" });
  }
  if (!req.file) {
    return res.status(400).json({ message: "Nenhuma foto enviada." });
  }

  const rawBase = (process.env.BASE_URL || '').replace(/\/api\/?$/, '').replace(/\/$/, '');
  const foto_url = `${rawBase}/uploads/${req.file.filename}`;

  atualizarUsuario(id, { foto_url }, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ foto_url });
  });
};

export const alterarSenha = (req, res) => {
  const usuarioId = req.user?.usuario_id;
  const { senhaAtual, novaSenha } = req.body;

  if (!senhaAtual || !novaSenha) {
    return res.status(400).json({ message: "Senha atual e nova senha são obrigatórias." });
  }

  buscarSenhaPorId(usuarioId, async (err, results) => {
    if (err) return res.status(500).json({ message: "Erro ao buscar dados do usuário." });
    if (!results || results.length === 0) return res.status(404).json({ message: "Usuário não encontrado." });

    const senhaHashBanco = results[0].senha_hash;

    try {
      const senhaValida = await bcrypt.compare(senhaAtual, senhaHashBanco);
      if (!senhaValida) {
        return res.status(401).json({ message: "A senha atual está incorreta." });
      }

      const novoHash = await bcrypt.hash(novaSenha, 10);

      atualizarSenha(usuarioId, novoHash, (errUpdate) => {
        if (errUpdate) return res.status(500).json({ message: "Erro ao atualizar a senha." });
        res.json({ message: "Senha alterada com sucesso!" });
      });

    } catch (bcryptErr) {
      console.error("[alterarSenha] Erro:", bcryptErr);
      return res.status(500).json({ message: "Erro interno ao processar senhas." });
    }
  });
};