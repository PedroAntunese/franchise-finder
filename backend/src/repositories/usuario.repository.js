import db from '../config/db.js';

const CAMPOS = 'id, nome, email, criado_em'; // nunca devolve senha_hash

export async function listar() {
  const [rows] = await db.query(`SELECT ${CAMPOS} FROM usuarios ORDER BY id DESC`);
  return rows;
}

export async function buscarPorId(id) {
  const [rows] = await db.query(`SELECT ${CAMPOS} FROM usuarios WHERE id = ?`, [id]);
  return rows[0];
}

// Usado só no login: aqui o hash vem junto para comparar a senha
export async function buscarPorEmail(email) {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows[0];
}

export async function criar({ nome, email, senhaHash }) {
  const [result] = await db.query(
    'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)',
    [nome, email, senhaHash]
  );
  return { id: result.insertId, nome, email };
}

export async function atualizar(id, { nome, email }) {
  const [result] = await db.query(
    'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
    [nome, email, id]
  );
  return result.affectedRows > 0;
}

export async function remover(id) {
  const [result] = await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

// Cria o usuário e o perfil juntos: ou grava os dois, ou nenhum
export async function criarComPerfil({ nome, email, senhaHash, tipo }, perfil) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [r] = await conn.query(
      'INSERT INTO usuarios (nome, email, senha_hash, tipo) VALUES (?, ?, ?, ?)',
      [nome, email, senhaHash, tipo]
    );
    const usuarioId = r.insertId;

    if (tipo === 'franquia') {
      await conn.query(
        'INSERT INTO franquias (usuario_id, cnpj, nome_fantasia) VALUES (?, ?, ?)',
        [usuarioId, perfil.cnpj, perfil.nomeFantasia]
      );
    } else {
      await conn.query(
        'INSERT INTO franqueados (usuario_id, tipo_pessoa, cpf, cnpj, razao_social) VALUES (?, ?, ?, ?, ?)',
        [usuarioId, perfil.tipoPessoa, perfil.cpf ?? null, perfil.cnpj ?? null, perfil.razaoSocial ?? null]
      );
    }

    await conn.commit();
    return { id: usuarioId, nome, email, tipo };
  } catch (err) {
    await conn.rollback(); // desfaz o usuário se o perfil falhar
    throw err;
  } finally {
    conn.release();
  }
}