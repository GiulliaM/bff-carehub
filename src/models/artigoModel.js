import db from "../config/db.js";

export const criarArtigo = (artigo, cb) => {
  const sql = `
    INSERT INTO artigos (titulo, subtitulo, conteudo, categoria, autor_id, imagem_url, fonte_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    artigo.titulo,
    artigo.subtitulo || null,
    artigo.conteudo,
    artigo.categoria,
    artigo.autor_id,
    artigo.imagem_url || null,
    artigo.fonte_url || null,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return cb(err);
    cb(null, { id: result.insertId, ...artigo });
  });
};

export const listarArtigos = (filtros, cb) => {
  let sql = `
    SELECT a.*, COALESCE(u.nome, 'Equipe CareHub') as nome_autor, u.foto_url as foto_autor
    FROM artigos a
    LEFT JOIN usuarios u ON a.autor_id = u.usuario_id
  `;

  const values = [];
  if (filtros.categoria) {
    sql += " WHERE a.categoria = ?";
    values.push(filtros.categoria);
  }

  sql += " ORDER BY a.created_at DESC";

  db.query(sql, values, cb);
};

export const buscarArtigoPorId = (id, cb) => {
  db.query("UPDATE artigos SET visualizacoes = visualizacoes + 1 WHERE artigo_id = ?", [id]);

  const sql = `
    SELECT a.*, COALESCE(u.nome, 'Equipe CareHub') as nome_autor, u.foto_url as foto_autor, u.telefone as contato_autor
    FROM artigos a
    LEFT JOIN usuarios u ON a.autor_id = u.usuario_id
    WHERE a.artigo_id = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return cb(err);
    cb(null, results[0]);
  });
};

export const deletarArtigo = (artigoId, autorId, cb) => {
  db.query(
    "DELETE FROM artigos WHERE artigo_id = ? AND autor_id = ?",
    [artigoId, autorId],
    cb
  );
};

