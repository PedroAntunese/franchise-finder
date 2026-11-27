import 'dotenv/config';
import mysql from 'mysql2/promise';

function lerCertificadoCA() {
  const valor = process.env.DB_CA_CERT;
  if (!valor) return undefined;
  if (valor.includes('BEGIN CERTIFICATE')) return valor.replace(/\\n/g, '\n');
  return Buffer.from(valor, 'base64').toString('utf8');
}

const ca = lerCertificadoCA();

// Dados de acesso ao banco, lidos do .env. Também usados pelo knexfile.js (migrations).
export const opcoesConexao = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: ca ? { ca } : undefined,
};

const pool = mysql.createPool({
  ...opcoesConexao,
  waitForConnections: true,
  connectionLimit: 10,
});

export async function testarConexao() {
  const conn = await pool.getConnection();
  conn.release();
}

export default pool;