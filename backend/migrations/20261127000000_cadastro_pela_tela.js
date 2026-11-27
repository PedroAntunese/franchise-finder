// Ajusta o banco aos dados que a tela "Criar conta" coleta hoje.
//
// Antes: franquias (cnpj, nome_fantasia) e franqueados (PF/PJ, cpf, cnpj).
// Esses campos nunca existiram no formulário, então ninguém conseguia criar conta pela tela.
//
// Depois, cada perfil guarda só o que o formulário dele pede:
//   franqueador -> tabela franqueadores (dados pessoais + endereço)
//   franqueado  -> tabela franqueados   (nome da unidade)
//   investidor  -> nada além da tabela usuarios

/** @param {import('knex').Knex} knex */
export async function up(knex) {
  // As tabelas antigas só são apagadas se estiverem vazias, para não perder dados.
  await apagarSeEstiverVazia(knex, 'franquias');
  await apagarSeEstiverVazia(knex, 'franqueados');

  // Quem tem a marca. Um registro por usuário com tipo = 'franqueador'.
  await knex.raw(`
    CREATE TABLE franqueadores (
      usuario_id   INT UNSIGNED PRIMARY KEY,
      sobrenome    VARCHAR(120) NOT NULL,
      idade        TINYINT UNSIGNED NOT NULL,
      cpf          CHAR(11)     NOT NULL,          -- só dígitos
      cep          CHAR(8)      NOT NULL,          -- só dígitos
      rua          VARCHAR(150) NOT NULL,
      numero       VARCHAR(20)  NOT NULL,
      complemento  VARCHAR(100) NULL,
      bairro       VARCHAR(100) NOT NULL,
      cidade       VARCHAR(100) NOT NULL,
      estado       CHAR(2)      NOT NULL,          -- sigla, ex.: SP
      CONSTRAINT uq_franqueadores_cpf UNIQUE (cpf),
      CONSTRAINT fk_franqueadores_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Quem opera uma unidade. Um registro por usuário com tipo = 'franqueado'.
  await knex.raw(`
    CREATE TABLE franqueados (
      usuario_id    INT UNSIGNED PRIMARY KEY,
      nome_unidade  VARCHAR(150) NOT NULL,
      CONSTRAINT fk_franqueados_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

/** @param {import('knex').Knex} knex */
export async function down(knex) {
  // Desfaz: apaga as tabelas novas e recria as antigas, iguais às da migration anterior.
  await apagarSeEstiverVazia(knex, 'franqueadores');
  await apagarSeEstiverVazia(knex, 'franqueados');

  await knex.raw(`
    CREATE TABLE franquias (
      usuario_id     INT UNSIGNED PRIMARY KEY,
      cnpj           CHAR(14)     NOT NULL,
      nome_fantasia  VARCHAR(150) NOT NULL,
      CONSTRAINT uq_franquias_cnpj UNIQUE (cnpj),
      CONSTRAINT fk_franquias_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await knex.raw(`
    CREATE TABLE franqueados (
      usuario_id    INT UNSIGNED PRIMARY KEY,
      tipo_pessoa   ENUM('PF', 'PJ') NOT NULL,
      cpf           CHAR(11)     NULL,
      cnpj          CHAR(14)     NULL,
      razao_social  VARCHAR(150) NULL,
      CONSTRAINT uq_franqueados_cpf  UNIQUE (cpf),
      CONSTRAINT uq_franqueados_cnpj UNIQUE (cnpj),
      CONSTRAINT fk_franqueados_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

// Apaga a tabela só se ela não tiver nenhuma linha. Se tiver, para tudo com um aviso.
async function apagarSeEstiverVazia(knex, tabela) {
  const [linhas] = await knex.raw(`SELECT COUNT(*) AS total FROM ${tabela}`);
  const total = Number(linhas[0].total);
  if (total > 0) {
    throw new Error(`A tabela ${tabela} tem ${total} registro(s). Migre esses dados antes de rodar esta migration.`);
  }
  await knex.schema.dropTable(tabela);
}
