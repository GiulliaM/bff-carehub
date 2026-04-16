import db from "../config/db.js";
import medicamentoModel from "../models/medicamentoModel.js";
import { pacientePertenceAoUsuario } from "../models/pacienteModel.js";

// ─── Helpers internos ─────────────────────────────────────────────────────────

function normalizarDataStr(valor) {
  if (!valor) return "";
  return valor instanceof Date
    ? valor.toISOString().substring(0, 10)
    : String(valor).substring(0, 10);
}

function isMedicamentoAtivoNaData(med, dataStr) {
  const inicioStr = normalizarDataStr(med.inicio);
  if (!inicioStr) return false;
  if (dataStr < inicioStr) return false;
  if (med.uso_continuo) return true;
  if (med.data_fim) return dataStr <= normalizarDataStr(med.data_fim);
  if (med.duracao_days && med.duracao_days > 0) {
    const fim = new Date(inicioStr + "T12:00:00");
    fim.setDate(fim.getDate() + Number(med.duracao_days) - 1);
    return dataStr <= fim.toISOString().substring(0, 10);
  }
  return dataStr === inicioStr;
}

function gerarHorariosIntervalo(primeiraHora, intervaloHoras) {
  const [hh, mm] = String(primeiraHora).split(":").map(Number);
  const step = (intervaloHoras || 1) * 60;
  let cur = (hh || 0) * 60 + (mm || 0);
  const resultado = [];
  while (cur < 24 * 60) {
    const h = String(Math.floor(cur / 60)).padStart(2, "0");
    const m = String(cur % 60).padStart(2, "0");
    resultado.push(`${h}:${m}`);
    cur += step;
  }
  return resultado;
}

export const buscarMedicamentos = (req, res) => {
  const { paciente_id } = req.params;
  const usuarioId = req.user.usuario_id;

  if (!paciente_id) {
    return res.status(400).json({ error: "ID do paciente nao fornecido" });
  }

  pacientePertenceAoUsuario(paciente_id, usuarioId, (err, pertence) => {
    if (err) return res.status(500).json({ error: "Erro ao verificar permissao" });
    if (!pertence) return res.status(403).json({ message: "Acesso negado a este paciente" });

    db.query("SELECT * FROM medicamentos WHERE paciente_id = ? ORDER BY horarios ASC", [paciente_id], (err2, results) => {
      if (err2) return res.status(500).json({ error: "Erro ao buscar medicamentos" });

      const medicamentos = (results || []).map((med) => {
        if (med.inicio) {
          med.inicio = med.inicio instanceof Date
            ? med.inicio.toISOString().substring(0, 10)
            : String(med.inicio).substring(0, 10);
        }
        if (med.data_fim) {
          med.data_fim = med.data_fim instanceof Date
            ? med.data_fim.toISOString().substring(0, 10)
            : String(med.data_fim).substring(0, 10);
        }
        if (med.horarios) {
          try { med.horarios = JSON.parse(med.horarios); }
          catch { med.horarios = typeof med.horarios === "string" ? med.horarios.split(",").map(h => h.trim()) : []; }
        }
        return med;
      });

      res.status(200).json(medicamentos);
    });
  });
};

export const buscarMedicamentoPorId = (req, res) => {
  const { id } = req.params;
  const usuarioId = req.user.usuario_id;

  db.query("SELECT * FROM medicamentos WHERE medicamento_id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar medicamento" });
    if (!rows || rows.length === 0) return res.status(404).json({ error: "Medicamento nao encontrado" });

    const med = rows[0];
    pacientePertenceAoUsuario(med.paciente_id, usuarioId, (err2, pertence) => {
      if (err2) return res.status(500).json({ error: "Erro ao verificar permissao" });
      if (!pertence) return res.status(403).json({ message: "Acesso negado" });

      if (med.horarios) {
        try { med.horarios = JSON.parse(med.horarios); }
        catch { med.horarios = typeof med.horarios === "string" ? med.horarios.split(",").map(h => h.trim()) : []; }
      }
      if (med.inicio) med.inicio = String(med.inicio).substring(0, 10);
      if (med.data_fim) med.data_fim = String(med.data_fim).substring(0, 10);

      res.json(med);
    });
  });
};

export const criarMedicamentoRota = (req, res) => {
  const pacienteId = req.body?.paciente_id;
  const usuarioId = req.user.usuario_id;
  if (!pacienteId) {
    return res.status(400).json({ error: "paciente_id e obrigatorio" });
  }
  pacientePertenceAoUsuario(pacienteId, usuarioId, (err, pertence) => {
    if (err) return res.status(500).json({ error: "Erro ao verificar permissao" });
    if (!pertence) return res.status(403).json({ message: "Acesso negado a este paciente" });

    medicamentoModel.criarMedicamento(req.body, (err2, result) => {
      if (err2) {
        console.error("Erro ao criar medicamento:", err2);
        return res.status(500).json({ error: "Erro ao criar medicamento" });
      }
      res.status(201).json({
        message: "Medicamento cadastrado com sucesso!",
        medicamento_id: result.insertId ?? null,
      });
    });
  });
};

export const atualizarMedicamentoRota = (req, res) => {
  const { id } = req.params;
  const dados = req.body;
  const usuarioId = req.user.usuario_id;
  const { atualizar_grupo } = req.query;

  db.query("SELECT * FROM medicamentos WHERE medicamento_id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar medicamento" });
    if (!rows || rows.length === 0) return res.status(404).json({ error: "Medicamento nao encontrado" });

    pacientePertenceAoUsuario(rows[0].paciente_id, usuarioId, (err2, pertence) => {
      if (err2) return res.status(500).json({ error: "Erro ao verificar permissao" });
      if (!pertence) return res.status(403).json({ message: "Acesso negado" });

      if (atualizar_grupo === "true" && rows[0].grupo_repeticao) {
        medicamentoModel.atualizarGrupo(rows[0].grupo_repeticao, parseInt(id), dados, (err3, result) => {
          if (err3) return res.status(500).json({ error: "Erro ao atualizar grupo" });
          res.json({ message: `${result.affectedRows} medicamentos atualizados.` });
        });
      } else {
        medicamentoModel.atualizarMedicamento(id, dados, (err3, result) => {
          if (err3) return res.status(500).json({ error: "Erro ao atualizar medicamento" });
          if (result.affectedRows === 0) return res.status(404).json({ error: "Medicamento nao encontrado" });
          res.json({ message: "Medicamento atualizado com sucesso!" });
        });
      }
    });
  });
};

export const alternarMedicamentoConcluido = (req, res) => {
  const { id } = req.params;
  const { concluido } = req.body;
  const usuarioId = req.user.usuario_id;

  db.query("SELECT paciente_id FROM medicamentos WHERE medicamento_id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar medicamento" });
    if (!rows || rows.length === 0) return res.status(404).json({ error: "Medicamento nao encontrado" });

    pacientePertenceAoUsuario(rows[0].paciente_id, usuarioId, (err2, pertence) => {
      if (err2) return res.status(500).json({ error: "Erro ao verificar permissao" });
      if (!pertence) return res.status(403).json({ message: "Acesso negado" });

      medicamentoModel.alternarMedicamento(id, concluido, (err3) => {
        if (err3) return res.status(500).json({ error: "Erro ao atualizar medicamento" });
        res.json({ message: concluido ? "Medicamento marcado como tomado" : "Medicamento desmarcado" });
      });
    });
  });
};

export const buscarDosesDoDia = (req, res) => {
  const { paciente_id, data } = req.params;
  const usuarioId = req.user.usuario_id;

  pacientePertenceAoUsuario(paciente_id, usuarioId, (err, pertence) => {
    if (err) return res.status(500).json({ error: "Erro ao verificar permissao" });
    if (!pertence) return res.status(403).json({ message: "Acesso negado a este paciente" });

    db.query(
      `SELECT medicamento_id, horario, tomado, hora_tomado
       FROM medicamento_doses
       WHERE medicamento_id IN (SELECT medicamento_id FROM medicamentos WHERE paciente_id = ?)
       AND data = ?`,
      [paciente_id, data],
      (err2, results) => {
        if (err2) return res.status(500).json({ error: "Erro ao buscar doses" });
        res.json(results || []);
      }
    );
  });
};

export const toggleDose = (req, res) => {
  const { id } = req.params;
  const { data, horario, tomado } = req.body;
  const usuarioId = req.user.usuario_id;

  if (!data || !horario || tomado === undefined) {
    return res.status(400).json({ error: "data, horario e tomado sao obrigatorios" });
  }

  db.query("SELECT paciente_id FROM medicamentos WHERE medicamento_id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar medicamento" });
    if (!rows || rows.length === 0) return res.status(404).json({ error: "Medicamento nao encontrado" });

    pacientePertenceAoUsuario(rows[0].paciente_id, usuarioId, (err2, pertence) => {
      if (err2) return res.status(500).json({ error: "Erro ao verificar permissao" });
      if (!pertence) return res.status(403).json({ message: "Acesso negado" });

      const horaTomado = tomado ? new Date().toISOString().slice(0, 19).replace("T", " ") : null;

      db.query(
        `INSERT INTO medicamento_doses (medicamento_id, data, horario, tomado, hora_tomado)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE tomado = VALUES(tomado), hora_tomado = VALUES(hora_tomado)`,
        [id, data, horario, tomado ? 1 : 0, horaTomado],
        (err3) => {
          if (err3) return res.status(500).json({ error: "Erro ao registrar dose" });
          res.json({ message: tomado ? "Dose registrada como tomada" : "Dose desmarcada" });
        }
      );
    });
  });
};

export const buscarAgendaDoDia = (req, res) => {
  const { paciente_id, data } = req.params;
  const usuarioId = req.user.usuario_id;

  pacientePertenceAoUsuario(paciente_id, usuarioId, (err, pertence) => {
    if (err) return res.status(500).json({ error: "Erro ao verificar permissao" });
    if (!pertence) return res.status(403).json({ message: "Acesso negado a este paciente" });

    db.query(
      "SELECT * FROM medicamentos WHERE paciente_id = ? AND concluido = 0",
      [paciente_id],
      (err2, meds) => {
        if (err2) return res.status(500).json({ error: "Erro ao buscar medicamentos" });

        const slotsRaw = [];

        for (const med of (meds || [])) {
          if (!isMedicamentoAtivoNaData(med, data)) continue;

          let horarios = [];
          try {
            horarios = typeof med.horarios === "string"
              ? JSON.parse(med.horarios)
              : (Array.isArray(med.horarios) ? med.horarios : []);
          } catch { horarios = []; }

          const horariosSlots =
            med.tipo_agendamento === "intervalo" && med.intervalo_horas && horarios.length > 0
              ? gerarHorariosIntervalo(horarios[0], med.intervalo_horas)
              : horarios.map((h) => String(h).substring(0, 5));

          const medNormalizado = {
            ...med,
            inicio: normalizarDataStr(med.inicio),
            data_fim: med.data_fim ? normalizarDataStr(med.data_fim) : null,
            horarios,
          };

          for (const horario of horariosSlots) {
            slotsRaw.push({
              medicamento_id: med.medicamento_id,
              nome: med.nome,
              horario,
              dosagem: med.dosagem,
              mg: med.mg,
              qtd_comprimidos: med.qtd_comprimidos,
              medicamento: medNormalizado,
            });
          }
        }

        slotsRaw.sort((a, b) => a.horario.localeCompare(b.horario));

        if (slotsRaw.length === 0) return res.json([]);

        const medIds = [...new Set(slotsRaw.map((s) => s.medicamento_id))];

        db.query(
          "SELECT medicamento_id, horario, tomado, hora_tomado FROM medicamento_doses WHERE medicamento_id IN (?) AND data = ?",
          [medIds, data],
          (err3, doses) => {
            if (err3) return res.status(500).json({ error: "Erro ao buscar doses" });

            const dosesMap = {};
            for (const d of (doses || [])) {
              dosesMap[`${d.medicamento_id}-${String(d.horario).substring(0, 5)}`] = d;
            }

            const result = slotsRaw.map((slot) => {
              const doseRec = dosesMap[`${slot.medicamento_id}-${slot.horario}`];
              return {
                ...slot,
                tomado: doseRec ? !!doseRec.tomado : false,
                hora_tomado: doseRec ? doseRec.hora_tomado : null,
              };
            });

            res.json(result);
          }
        );
      }
    );
  });
};

export const excluirMedicamento = (req, res) => {
  const { id } = req.params;
  const usuarioId = req.user.usuario_id;

  db.query("SELECT paciente_id FROM medicamentos WHERE medicamento_id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Erro ao excluir medicamento" });
    if (!rows || rows.length === 0) return res.status(404).json({ error: "Medicamento nao encontrado" });

    pacientePertenceAoUsuario(rows[0].paciente_id, usuarioId, (err2, pertence) => {
      if (err2) return res.status(500).json({ error: "Erro ao verificar permissao" });
      if (!pertence) return res.status(403).json({ message: "Acesso negado" });

      db.query("DELETE FROM medicamentos WHERE medicamento_id = ?", [id], (err3, result) => {
        if (err3) return res.status(500).json({ error: "Erro ao excluir medicamento" });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Medicamento nao encontrado" });
        res.json({ message: "Medicamento excluido com sucesso!" });
      });
    });
  });
};
