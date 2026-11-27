// Única parte do código que conversa com o banco sobre usuários. Aqui só tem SQL, nenhuma regra.
import db from '../config/db.js';

// Colunas que podem sair da API. A senha_hash nunca entra nesta lista.
const COLUNAS_PUBLICAS = 'id, nome, email, tipo, criado_em';

export async function listar() {
  const [linhas] = await db.query(`SELECT ${COLUNAS_PUBLICAS} FROM usuarios ORDER BY id DESC`);
  return linhas;
}

export async function buscarPorId(id) {
  const [linhas] = await db.query(`SELECT ${COLUNAS_PUBLICAS} FROM usuarios WHERE id = ?`, [id]);
  return linhas[0];
}

// Usado só no login: aqui o hash da senha vem junto, para comparar.
export async function buscarPorEmail(email) {
  const [linhas] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  return linhas[0];
}

// Grava o usuário e, se o perfil tiver dados extras, grava esses dados também.
// É tudo ou nada (transação): se a segunda gravação falhar, a primeira é desfeita.
export async function criar(usuario, perfil) {
  const conexao = await db.getConnection();

  try {
    await conexao.beginTransaction();

    const [resultado] = await conexao.query(
      'INSERT INTO usuarios (nome, email, senha_hash, tipo) VALUES (?, ?, ?, ?)',
      [usuario.nome, usuario.email, usuario.senhaHash, usuario.tipo]
    );
    const usuarioId = resultado.insertId;

    if (usuario.tipo === 'franqueador') {
      await conexao.query(
        `INSERT INTO franqueadores
           (usuario_id, sobrenome, idade, cpf, cep, rua, numero, complemento, bairro, cidade, estado)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          usuarioId, perfil.sobrenome, perfil.idade, perfil.cpf, perfil.cep, perfil.rua,
          perfil.numero, perfil.complemento || null, perfil.bairro, perfil.cidade, perfil.estado,
        ]
      );
    }

    if (usuario.tipo === 'franqueado') {
      await conexao.query(
        'INSERT INTO franqueados (usuario_id, nome_unidade) VALUES (?, ?)',
        [usuarioId, perfil.nomeUnidade]
      );
    }

    await conexao.commit();
    return { id: usuarioId, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo };
  } catch (erro) {
    await conexao.rollback(); // desfaz o que foi gravado
    throw erro;
  } finally {
    conexao.release(); // devolve a conexão para o pool
  }
}

export async function atualizar(id, { nome, email }) {
  const [resultado] = await db.query(
    'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
    [nome, email, id]
  );
  return resultado.affectedRows > 0;
}

export async function remover(id) {
  const [resultado] = await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
  return resultado.affectedRows > 0;
}
