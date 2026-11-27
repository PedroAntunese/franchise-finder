// Primeira migration: cria as tabelas que a API usa hoje.
// Nunca edite uma migration que já rodou em algum banco. Para mudar o schema,
// crie uma nova com: npm run migrate:make -- nome_da_mudanca

/** @param {import('knex').Knex} knex */
export async function up(knex) {
  // Conta de acesso. Todo mundo que faz login tem uma linha aqui.
  await knex.raw(`
    CREATE TABLE usuarios (
      id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      nome        VARCHAR(120) NOT NULL,
      email       VARCHAR(160) NOT NULL,
      senha_hash  VARCHAR(100) NOT NULL,             -- hash bcrypt, nunca a senha
      tipo        VARCHAR(20)  NOT NULL,             -- 'franquia' ou 'franqueado'
      criado_em   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT uq_usuarios_email UNIQUE (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Perfil de quem tem a marca (tipo = 'franquia'). Um por usuário.
  await knex.raw(`
    CREATE TABLE franquias (
      usuario_id     INT UNSIGNED PRIMARY KEY,
      cnpj           CHAR(14)     NOT NULL,          -- só dígitos
      nome_fantasia  VARCHAR(150) NOT NULL,
      CONSTRAINT uq_franquias_cnpj UNIQUE (cnpj),
      CONSTRAINT fk_franquias_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Perfil de quem opera uma unidade (tipo = 'franqueado'). Um por usuário.
  // Pessoa física preenche cpf; pessoa jurídica preenche cnpj e razao_social.
  await knex.raw(`
    CREATE TABLE franqueados (
      usuario_id    INT UNSIGNED PRIMARY KEY,
      tipo_pessoa   ENUM('PF', 'PJ') NOT NULL,
      cpf           CHAR(11)     NULL,               -- só dígitos
      cnpj          CHAR(14)     NULL,               -- só dígitos
      razao_social  VARCHAR(150) NULL,
      CONSTRAINT uq_franqueados_cpf  UNIQUE (cpf),
      CONSTRAINT uq_franqueados_cnpj UNIQUE (cnpj),
      CONSTRAINT fk_franqueados_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

/** @param {import('knex').Knex} knex */
export async function down(knex) {
  // Ordem inversa: os perfis dependem de usuarios
  await knex.schema.dropTableIfExists('franqueados');
  await knex.schema.dropTableIfExists('franquias');
  await knex.schema.dropTableIfExists('usuarios');
}
