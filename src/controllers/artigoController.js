import artigoModel from "../models/artigoModel.js";

/**
 * Registra um novo artigo. 
 * Idealmente, deve haver um middleware antes para garantir que o usuário é 'cuidador'.
 */
export const criarArtigo = (req, res) => {
  const { titulo, subtitulo, conteudo, categoria, imagem_url } = req.body;
  const autor_id = req.usuarioId; // Assumindo que o ID vem do token JWT/Middleware de Auth

  if (!titulo || !conteudo || !categoria) {
    return res.status(400).json({ error: "Título, conteúdo e categoria são obrigatórios." });
  }

  const novoArtigo = { titulo, subtitulo, conteudo, categoria, autor_id, imagem_url };

  artigoModel.criarArtigo(novoArtigo, (err, result) => {
    if (err) {
      console.error("Erro ao criar artigo:", err);
      return res.status(500).json({ error: "Erro interno ao salvar o artigo." });
    }
    res.status(201).json({ message: "Artigo publicado com sucesso!", artigo: result });
  });
};

/**
 * Lista artigos com opção de filtro por categoria.
 */
export const listarArtigos = (req, res) => {
  const { categoria } = req.query;

  artigoModel.listarArtigos({ categoria }, (err, results) => {
    if (err) {
      console.error("Erro ao listar artigos:", err);
      return res.status(500).json({ error: "Erro ao buscar artigos." });
    }
    res.json(results);
  });
};

/**
 * Busca detalhes de um artigo específico.
 */
export const buscarArtigoPorId = (req, res) => {
  const { id } = req.params;

  artigoModel.buscarArtigoPorId(id, (err, artigo) => {
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

/**
 * Deleta um artigo (Verifica se quem deleta é o autor).
 */
export const deletarArtigo = (req, res) => {
  const { id } = req.params;
  const autor_id = req.usuarioId;

  artigoModel.deletarArtigo(id, autor_id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao deletar o artigo." });
    }
    if (result.affectedRows === 0) {
      return res.status(403).json({ error: "Você não tem permissão para deletar este artigo." });
    }
    res.json({ message: "Artigo removido com sucesso." });
  });
};

export default {
  criarArtigo,
  listarArtigos,
  buscarArtigoPorId,
  deletarArtigo
};