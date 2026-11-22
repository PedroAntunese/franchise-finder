import app from './app.js';
import { env } from './config/env.js';
import { testarConexao } from './config/db.js';

if (!process.env.JWT_SECRET) {
  console.error('Defina JWT_SECRET no .env');
  process.exit(1);
}

try {
  await testarConexao();
  console.log('Conectado ao MySQL!');
} catch (err) {
  console.error('Erro ao conectar ao MySQL:', err.message);
  process.exit(1);
}

app.listen(env.port, () => {
  console.log(`Backend running on port ${env.port}`);
});