import { criarArtigo as criarArtigoModel, listarArtigos as listarArtigosModel, buscarArtigoPorId as buscarArtigoPorIdModel, deletarArtigo as deletarArtigoModel } from "../models/artigoModel.js";

export const criarArtigo = (req, res) => {
  const { titulo, subtitulo, conteudo, categoria, imagem_url, fonte_url } = req.body;
  const autor_id = req.user.usuario_id;

  if (!titulo || !conteudo || !categoria) {
    return res.status(400).json({ error: "Título, conteúdo e categoria são obrigatórios." });
  }

  criarArtigoModel({ titulo, subtitulo, conteudo, categoria, autor_id, imagem_url, fonte_url }, (err, result) => {
    if (err) {
      console.error("Erro ao criar artigo:", err);
      return res.status(500).json({ error: "Erro interno ao salvar o artigo." });
    }
    res.status(201).json({ message: "Artigo publicado com sucesso!", artigo: result });
  });
};

export const listarArtigos = (req, res) => {
  const { categoria } = req.query;

  listarArtigosModel({ categoria }, (err, results) => {
    if (err) {
      console.error("Erro ao listar artigos:", err);
      return res.status(500).json({ error: "Erro ao buscar artigos." });
    }
    res.json(results);
  });
};

export const buscarArtigoPorId = (req, res) => {
  const { id } = req.params;

  buscarArtigoPorIdModel(id, (err, artigo) => {
    if (err) {
      console.error("Erro ao buscar artigo:", err);
      return res.status(500).json({ error: "Erro ao buscar o conteúdo." });
    }
    if (!artigo) {
      return res.status(404).json({ error: "Artigo não encontrado." });
    }
    res.json(artigo);
  });
};

export const deletarArtigo = (req, res) => {
  const { id } = req.params;
  const autor_id = req.user.usuario_id;

  deletarArtigoModel(id, autor_id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao deletar o artigo." });
    }
    if (result.affectedRows === 0) {
      return res.status(403).json({ error: "Você não tem permissão para deletar este artigo." });
    }
    res.json({ message: "Artigo removido com sucesso." });
  });
};