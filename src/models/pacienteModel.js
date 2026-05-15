import db from "../config/db.js";

const COLUNAS_PERMITIDAS = [
  "nome", "idade", "genero", "observacoes", "data_nascimento",
  "informacoes_medicas", "foto_url", "nome_cuidador_ativo",
  "tipo_sanguineo", "peso_kg", "altura_cm", "restricoes_alimentares",
  "mobilidade", "plano_saude_nome", "plano_saude_numero",
  "responsavel_legal", "telefone_contato", "categorias_cuidado", "observacoes_rotina",
];

export const atualizarPaciente = (id, changes, cb) => {
  const allowed = Object.keys(changes).filter((k) => COLUNAS_PERMITIDAS.includes(k));
  if (allowed.length === 0) return cb(null, { affectedRows: 0 });
  const fields = allowed.map((k) => `${k} = ?`).join(", ");
  const values = allowed.map((k) => changes[k]);
  values.push(id);
  const sql = `UPDATE pacientes SET ${fields} WHERE paciente_id = ?`;
  db.query(sql, values, cb);
};

export const criarPaciente = (paciente, cb) => {
  const sql = `
    INSERT INTO pacientes
    (nome, idade, genero, observacoes, criado_por, data_nascimento, tipo_sanguineo, peso_kg, altura_cm, restricoes_alimentares, mobilidade, plano_saude_nome, plano_saude_numero, responsavel_legal, telefone_contato, categorias_cuidado, observacoes_rotina)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    paciente.nome,
    paciente.idade || null,
    paciente.genero || null,
    paciente.observacoes || null,
    paciente.criado_por || null,
    paciente.data_nascimento || null,
    paciente.tipo_sanguineo || null,
    paciente.peso_kg || null,
    paciente.altura_cm || null,
    paciente.restricoes_alimentares || null,
    paciente.mobilidade || 'Nenhuma',
    paciente.plano_saude_nome || null,
    paciente.plano_saude_numero || null,
    paciente.responsavel_legal || null,
    paciente.telefone_contato || null,
    paciente.categorias_cuidado || null,
    paciente.observacoes_rotina || null,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return cb(err);
    const pacienteId = result.insertId;

    if (!paciente.criado_por) return cb(null, result);

    const parentescoInicial = paciente.parentesco || 'Responsável';

    db.query(
      "INSERT INTO grupo_cuidado (usuario_id, paciente_id, papel, status, parentesco) VALUES (?, ?, 'dono', 'Ativo', ?)",
      [paciente.criado_por, pacienteId, parentescoInicial],
      (err2) => {
        if (err2) return cb(err2);
        cb(null, result);
      }
    );
  });
};

export const listarPacientesPorUsuario = (usuarioId, cb) => {
  const sql = `
    SELECT p.*, gc.papel, gc.status as vinculo_status, gc.parentesco
    FROM pacientes p
    JOIN grupo_cuidado gc ON gc.paciente_id = p.paciente_id
    WHERE gc.usuario_id = ? AND gc.status = 'Ativo'
    ORDER BY gc.data_vinculo ASC
  `;
  db.query(sql, [usuarioId], cb);
};

export const buscarPacientePorId = (id, cb) => {
  db.query("SELECT * FROM pacientes WHERE paciente_id = ?", [id], cb);
};

export const pacientePertenceAoUsuario = (pacienteId, usuarioId, cb) => {
  db.query(
    "SELECT 1 FROM grupo_cuidado WHERE paciente_id = ? AND usuario_id = ? AND status = 'Ativo'",
    [pacienteId, usuarioId],
    (err, results) => {
      if (err) return cb(err);
      cb(null, results && results.length > 0);
    }
  );
};

export const usuarioEhDono = (pacienteId, usuarioId, cb) => {
  db.query(
    "SELECT 1 FROM grupo_cuidado WHERE paciente_id = ? AND usuario_id = ? AND papel = 'dono' AND status = 'Ativo'",
    [pacienteId, usuarioId],
    (err, results) => {
      if (err) return cb(err);
      cb(null, results && results.length > 0);
    }
  );
};

export const deletarPaciente = (pacienteId, cb) => {
  // Deletar dados dependentes em ordem antes do paciente
  db.query("DELETE di FROM diario_itens di JOIN diario_registros dr ON dr.registro_id = di.registro_id WHERE dr.paciente_id = ?", [pacienteId], (err) => {
    if (err) return cb(err);
    db.query("DELETE FROM diario_registros WHERE paciente_id = ?", [pacienteId], (err2) => {
      if (err2) return cb(err2);
      db.query("DELETE FROM medicamentos WHERE paciente_id = ?", [pacienteId], (err3) => {
        if (err3) return cb(err3);
        db.query("DELETE FROM tarefas WHERE paciente_id = ?", [pacienteId], (err4) => {
          if (err4) return cb(err4);
          db.query("DELETE FROM historico_medico WHERE paciente_id = ?", [pacienteId], (err5) => {
            if (err5) return cb(err5);
            db.query("DELETE FROM vacinas WHERE paciente_id = ?", [pacienteId], (err6) => {
              if (err6) return cb(err6);
              db.query("DELETE FROM grupo_cuidado WHERE paciente_id = ?", [pacienteId], (err7) => {
                if (err7) return cb(err7);
                db.query("DELETE FROM pacientes WHERE paciente_id = ?", [pacienteId], cb);
              });
            });
          });
        });
      });
    });
  });
};

