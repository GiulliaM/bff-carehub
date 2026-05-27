import db from "../config/db.js";

const MAX_MEMBROS_POR_PACIENTE = 5;
const MAX_PACIENTES_POR_USUARIO = 3;

export const listarPacientesDoUsuario = (usuarioId, cb) => {
  const sql = `
    SELECT p.*, gc.papel, gc.status, gc.data_vinculo, gc.parentesco
    FROM grupo_cuidado gc
    JOIN pacientes p ON p.paciente_id = gc.paciente_id
    WHERE gc.usuario_id = ? AND gc.status = 'Ativo'
    ORDER BY gc.data_vinculo ASC
  `;
  db.query(sql, [usuarioId], cb);
};

export const listarMembrosDoGrupo = (pacienteId, cb) => {
  const sql = `
    SELECT u.usuario_id, u.nome, u.email, u.tipo, u.telefone, u.foto_url,
           gc.papel, gc.status, gc.data_vinculo, gc.parentesco
    FROM grupo_cuidado gc
    JOIN usuarios u ON u.usuario_id = gc.usuario_id
    WHERE gc.paciente_id = ? AND gc.status = 'Ativo'
    ORDER BY gc.papel ASC, gc.data_vinculo ASC
  `;
  db.query(sql, [pacienteId], cb);
};

export const usuarioNoGrupo = (usuarioId, pacienteId, cb) => {
  db.query(
    "SELECT 1 FROM grupo_cuidado WHERE usuario_id = ? AND paciente_id = ? AND status = 'Ativo'",
    [usuarioId, pacienteId],
    (err, results) => {
      if (err) return cb(err);
      cb(null, results && results.length > 0);
    }
  );
};

// verifica limites antes de inserir
export const adicionarMembro = (usuarioId, pacienteId, papel, parentesco, cb) => {
  // Verificar limite de membros do paciente
  db.query(
    "SELECT COUNT(*) AS total FROM grupo_cuidado WHERE paciente_id = ? AND status = 'Ativo'",
    [pacienteId],
    (err, rows) => {
      if (err) return cb(err);
      if (rows[0].total >= MAX_MEMBROS_POR_PACIENTE) {
        return cb(null, { error: `Este paciente ja possui ${MAX_MEMBROS_POR_PACIENTE} membros no grupo de cuidado.` });
      }

      db.query(
        "SELECT COUNT(*) AS total FROM grupo_cuidado WHERE usuario_id = ? AND status = 'Ativo'",
        [usuarioId],
        (err2, rows2) => {
          if (err2) return cb(err2);
          if (rows2[0].total >= MAX_PACIENTES_POR_USUARIO) {
            return cb(null, { error: `Voce ja esta vinculado a ${MAX_PACIENTES_POR_USUARIO} pacientes.` });
          }

          const sql = `
            INSERT INTO grupo_cuidado (usuario_id, paciente_id, papel, status, parentesco)
            VALUES (?, ?, ?, 'Ativo', ?)
            ON DUPLICATE KEY UPDATE status = 'Ativo', papel = VALUES(papel), parentesco = VALUES(parentesco)
          `;
          
          db.query(sql, [usuarioId, pacienteId, papel || "familiar", parentesco || "Familiar"], (err3, result) => {
            if (err3) return cb(err3);
            cb(null, { ok: true, id: result.insertId });
          });
        }
      );
    }
  );
};

export const removerMembro = (usuarioId, pacienteId, cb) => {
  db.query(
    "UPDATE grupo_cuidado SET status = 'Encerrado' WHERE usuario_id = ? AND paciente_id = ?",
    [usuarioId, pacienteId],
    cb
  );
};

export const listarResponsaveisTarefa = (tarefaId, cb) => {
  const sql = `
    SELECT u.usuario_id, u.nome
    FROM tarefa_responsaveis tr
    JOIN usuarios u ON u.usuario_id = tr.usuario_id
    WHERE tr.tarefa_id = ?
  `;
  db.query(sql, [tarefaId], cb);
};

// substitui todos os responsaveis da tarefa
export const setResponsaveisTarefa = (tarefaId, usuarioIds, cb) => {
  db.query("DELETE FROM tarefa_responsaveis WHERE tarefa_id = ?", [tarefaId], (err) => {
    if (err) return cb(err);
    if (!usuarioIds || usuarioIds.length === 0) return cb(null);

    const values = usuarioIds.map((uid) => [tarefaId, uid]);
    db.query(
      "INSERT IGNORE INTO tarefa_responsaveis (tarefa_id, usuario_id) VALUES ?",
      [values],
      cb
    );
  });
};

export default {
  listarPacientesDoUsuario,
  listarMembrosDoGrupo,
  usuarioNoGrupo,
  adicionarMembro,
  removerMembro,
  listarResponsaveisTarefa,
  setResponsaveisTarefa,
  MAX_MEMBROS_POR_PACIENTE,
  MAX_PACIENTES_POR_USUARIO,
};