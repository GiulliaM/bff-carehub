// Validacao de CPF por digito verificador (mesma regra do app).
// Nao confirma identidade real, mas rejeita CPF malformado/sequencial (ex: 111.111.111-11).
export function validarCPF(cpf) {
  if (!cpf) return false;
  const n = String(cpf).replace(/\D/g, "");
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(n[i], 10) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(n[9], 10)) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(n[i], 10) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(n[10], 10);
}

// normaliza pra so digitos (pra guardar e comparar duplicidade de forma consistente)
export function soDigitosCPF(cpf) {
  return cpf ? String(cpf).replace(/\D/g, "") : null;
}
