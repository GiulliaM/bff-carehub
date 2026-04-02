import db from "../config/db.js";

/**
 * Cria um novo artigo no sistema.
 * Apenas usuários do tipo 'cuidador' devem ter acesso a essa função no Controller.
 */
export const criarArtigo = (artigo, cb) => {
  const sql = `
    INSERT INTO artigos (titulo, subtitulo, conteudo, categoria, autor_id, imagem_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    artigo.titulo,
    artigo.subtitulo || null,
    artigo.conteudo,
    artigo.categoria,
    artigo.autor_id,
    artigo.imagem_url || null
  ];

  db.query(sql, values, (err, result) => {
    if (err) return cb(err);
    cb(null, { id: result.insertId, ...artigo });
  });
};

/**
 * Lista todos os artigos para o feed, trazendo o nome do autor (Cuidador).
 */
export const listarArtigos = (filtros, cb) => {
  let sql = `
    SELECT a.*, u.nome as nome_autor, u.foto_url as foto_autor
    FROM artigos a
    JOIN usuarios u ON a.autor_id = u.usuario_id
  `;
  
  const values = [];
  if (filtros.categoria) {
    sql += " WHERE a.categoria = ?";
    values.push(filtros.categoria);
  }

  sql += " ORDER BY a.created_at DESC";

  db.query(sql, values, cb);
};

/**
 * Busca um artigo específico pelo ID e aumenta o contador de visualizações.
 */
export const buscarArtigoPorId = (id, cb) => {
  // Primeiro aumentamos a visualização (métrica para o TCC)
  db.query("UPDATE artigos SET visualizacoes = visualizacoes + 1 WHERE artigo_id = ?", [id]);

  const sql = `
    SELECT a.*, u.nome as nome_autor, u.foto_url as foto_autor, u.telefone as contato_autor
    FROM artigos a
    JOIN usuarios u ON a.autor_id = u.usuario_id
    WHERE a.artigo_id = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return cb(err);
    cb(null, results[0]);
  });
};

/**
 * Remove um artigo (apenas o autor ou admin).
 */
export const deletarArtigo = (artigoId, autorId, cb) => {
  db.query(
    "DELETE FROM artigos WHERE artigo_id = ? AND autor_id = ?",
    [artigoId, autorId],
    cb
  );
};

export default {
  criarArtigo,
  listarArtigos,
  buscarArtigoPorId,
  deletarArtigo
};