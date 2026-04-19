import db from "../config/db.js";

const COLUNAS_PERMITIDAS = ["nome", "email", "tipo", "telefone"];

export const atualizarUsuario = (id, changes, cb) => {
  const allowed = Object.keys(changes).filter((k) => COLUNAS_PERMITIDAS.includes(k));
  if (allowed.length === 0) return cb(null, { affectedRows: 0 });
  const fields = allowed.map((k) => `${k} = ?`).join(", ");
  const values = allowed.map((k) => changes[k]);
  values.push(id);
  const sql = `UPDATE usuarios SET ${fields} WHERE usuario_id = ?`;
  db.query(sql, values, cb);
};
export const criarUsuario = (usuario, cb) => {
  const sql = "INSERT INTO usuarios (nome, email, senha_hash, tipo) VALUES (?, ?, ?, ?)";
  const values = [usuario.nome, usuario.email, usuario.senha_hash, usuario.tipo];
  db.query(sql, values, cb);
};
export const buscarPorEmail = (email, cb) => {
  db.query("SELECT * FROM usuarios WHERE email = ?", [email], cb);
};
export const buscarPorId = (id, cb) => {
  db.query("SELECT usuario_id, nome, email, tipo, telefone, created_at FROM usuarios WHERE usuario_id = ?", [id], cb);
};

export const buscarSenhaPorId = (id, cb) => {
  import("../config/db.js").then((db) => {
    db.default.query("SELECT senha_hash FROM usuarios WHERE usuario_id = ?", [id], cb);
  });
};

export const atualizarSenha = (id, novaSenhaHash, cb) => {
  import("../config/db.js").then((db) => {
    db.default.query("UPDATE usuarios SET senha_hash = ? WHERE usuario_id = ?", [novaSenhaHash, id], cb);
  });
};

export const salvarPushToken = (usuarioId, token, cb) => {
  db.query("UPDATE usuarios SET push_token = ? WHERE usuario_id = ?", [token, usuarioId], cb);
};

export const obterTokensGrupo = (pacienteId, excluirUsuarioId, cb) => {
  db.query(
    `SELECT u.push_token FROM usuarios u
     JOIN grupo_cuidado gc ON gc.usuario_id = u.usuario_id
     WHERE gc.paciente_id = ? AND gc.status = 'Ativo'
       AND gc.usuario_id != ? AND u.push_token IS NOT NULL`,
    [pacienteId, excluirUsuarioId],
    cb
  );
};
