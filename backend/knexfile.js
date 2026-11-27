// Configuração do Knex, usada só pelas migrations (npm run migrate).
// A API continua usando o pool do mysql2 em src/config/db.js; os dois leem o mesmo .env.
import { opcoesConexao } from './src/config/db.js';

export default {
  client: 'mysql2',
  connection: opcoesConexao,
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations', // registra quais migrations já rodaram em cada banco
    loadExtensions: ['.js'],
  },
};
