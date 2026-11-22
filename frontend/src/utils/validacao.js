const emailValido = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function validarLogin({ email, senha }) {
  const erros = {};
  if (!emailValido(email.trim())) erros.email = "Digite um e-mail válido.";
  if (!senha) erros.senha = "Digite sua senha.";
  return erros;
}

export function validarCadastro(v, perfil) {
  const erros = {};
  if (v.nome.trim().length < 3) erros.nome = "Digite seu nome completo.";
  if (!emailValido(v.email.trim())) erros.email = "Digite um e-mail válido.";
  if (perfil.extra && !v.extra.trim()) erros.extra = "Preencha este campo.";
  if (v.senha.length < 8) erros.senha = "A senha precisa ter ao menos 8 caracteres.";
  if (v.confirmar !== v.senha) erros.confirmar = "As senhas não são iguais.";
  if (!v.termos) erros.termos = "Aceite os termos para continuar.";
  return erros;
}
