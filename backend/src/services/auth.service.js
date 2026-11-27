// Regras do cadastro e do login: o que é obrigatório, como a senha é guardada e como o token é gerado.
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as repositorio from '../repositories/usuario.repository.js';
import AppError from '../utils/AppError.js';
import { cpfValido } from '../utils/cpf.js';
import { limparDoc } from '../utils/documentos.js';

// Os três perfis da tela inicial. O valor é gravado na coluna usuarios.tipo.
const TIPOS_DE_CONTA = ['franqueador', 'franqueado', 'investidor'];

const FORMATO_DE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TAMANHO_MINIMO_DA_SENHA = 8; // o mesmo que a tela de cadastro pede

// ---------- Cadastro ----------

export async function cadastrar(dados) {
  const tipo = dados.tipo;
  const nome = texto(dados.nome);
  const email = texto(dados.email).toLowerCase();
  const senha = typeof dados.senha === 'string' ? dados.senha : '';

  // 1. Dados que toda conta tem
  if (!TIPOS_DE_CONTA.includes(tipo)) recusar('Tipo de conta inválido');
  if (!nome) recusar('Informe o nome');
  if (!FORMATO_DE_EMAIL.test(email)) recusar('Informe um e-mail válido');
  if (senha.length < TAMANHO_MINIMO_DA_SENHA) {
    recusar(`A senha precisa ter pelo menos ${TAMANHO_MINIMO_DA_SENHA} caracteres`);
  }

  // 2. Dados que só alguns perfis têm (o investidor não tem nenhum extra)
  let perfil = null;
  if (tipo === 'franqueador') perfil = lerDadosDoFranqueador(dados);
  if (tipo === 'franqueado') perfil = lerDadosDoFranqueado(dados);

  // 3. Grava no banco. A senha nunca é salva: só o hash dela.
  const senhaHash = await bcrypt.hash(senha, 10);

  try {
    return await repositorio.criar({ nome, email, senhaHash, tipo }, perfil);
  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      // O MySQL diz qual regra barrou, ex.: "... for key 'franqueadores.uq_franqueadores_cpf'"
      const regraQueBarrou = erro.sqlMessage.split(' for key ').pop();
      const campoRepetido = regraQueBarrou.includes('cpf') ? 'CPF' : 'E-mail';
      throw new AppError(`${campoRepetido} já cadastrado`, 409);
    }
    throw erro;
  }
}

// Formulário do franqueador: dados pessoais + endereço
function lerDadosDoFranqueador(dados) {
  const franqueador = {
    sobrenome: texto(dados.sobrenome),
    idade: Number(dados.idade),
    cpf: limparDoc(dados.cpf),
    cep: limparDoc(dados.cep),
    rua: texto(dados.rua),
    numero: texto(dados.numero),
    complemento: texto(dados.complemento),
    bairro: texto(dados.bairro),
    cidade: texto(dados.cidade),
    estado: texto(dados.estado).toUpperCase(),
  };

  if (!franqueador.sobrenome) recusar('Informe o sobrenome');
  if (!Number.isInteger(franqueador.idade) || franqueador.idade < 18 || franqueador.idade > 120) {
    recusar('Informe uma idade válida (18 anos ou mais)');
  }
  if (!cpfValido(franqueador.cpf)) recusar('CPF inválido');
  if (franqueador.cep.length !== 8) recusar('CEP inválido');
  if (!franqueador.rua) recusar('Informe a rua');
  if (!franqueador.numero) recusar('Informe o número');
  if (!franqueador.bairro) recusar('Informe o bairro');
  if (!franqueador.cidade) recusar('Informe a cidade');
  if (franqueador.estado.length !== 2) recusar('Informe o estado com 2 letras (ex.: SP)');

  return franqueador;
}

// Formulário do franqueado: só o nome da unidade
function lerDadosDoFranqueado(dados) {
  const nomeUnidade = texto(dados.nomeUnidade);
  if (!nomeUnidade) recusar('Informe o nome da unidade ou franquia');
  return { nomeUnidade };
}

// ---------- Login ----------

export async function login(dados) {
  const email = texto(dados.email).toLowerCase();
  const senha = typeof dados.senha === 'string' ? dados.senha : '';

  if (!email || !senha) recusar('Informe e-mail e senha');

  const usuario = await repositorio.buscarPorEmail(email);
  const senhaCorreta = usuario && (await bcrypt.compare(senha, usuario.senha_hash));

  // Mesma mensagem para e-mail inexistente e senha errada: assim ninguém descobre quais e-mails existem.
  if (!senhaCorreta) throw new AppError('E-mail ou senha incorretos', 401);

  // O token é o "crachá" que o front manda em toda requisição protegida.
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '1d' }
  );

  return {
    token,
    usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo },
  };
}

// ---------- Ajudantes ----------

// Tira os espaços das pontas. Se não for texto, devolve texto vazio.
function texto(valor) {
  return typeof valor === 'string' ? valor.trim() : '';
}

// Interrompe com um erro 400 e a mensagem que aparece na tela.
function recusar(mensagem) {
  throw new AppError(mensagem, 400);
}
