# Franchise Finder

Projeto integrador organizado em duas aplicações independentes: uma API em Node.js e Express no `backend/` e uma interface React com Create React App no `frontend/`.

## Requisitos

- Node.js 20 ou superior
- npm

## Configuração

1. Copie `.env.example` para `.env` na raiz e ajuste os valores locais.
2. Instale as dependências em cada aplicação:

   ```powershell
   npm install --prefix backend
   npm install --prefix frontend
   ```

3. Inicie cada aplicação em um terminal separado:

   ```powershell
   npm run dev --prefix backend
   npm start --prefix frontend
   ```

A API ficará disponível em `http://localhost:3000`. O frontend do Create React App usa a porta `3000` por padrão; como essa porta já é usada pela API, aceite a porta alternativa sugerida pelo terminal, normalmente `http://localhost:3001`.

## Estrutura atual

### Raiz

- `.env`: configurações locais; ignorado pelo Git. Não coloque credenciais em arquivos versionados.
- `.env.example`: modelo de variáveis de ambiente sem segredos para compartilhar e versionar.
- `.gitignore`: exclui dependências, builds, logs e arquivos locais.
- `README.md`: documentação do projeto e dos comandos principais.

### `backend/`

- `package.json`: dependências e scripts da API.
- `package-lock.json`: versões exatas das dependências instaladas.
- `src/server.js`: inicialização do servidor HTTP e definição da porta.
- `src/app.js`: configuração prevista para a aplicação Express.
- `src/config/`: configurações da aplicação, incluindo variáveis de ambiente.
- `src/routes/`: reservado para definição dos endpoints da API; atualmente está vazio.
- `src/controllers/`: reservado para controllers responsáveis por requisições e respostas HTTP; atualmente está vazio.
- `src/middlewares/`: reservado para middlewares, como autenticação e tratamento de erros; atualmente está vazio.
- `src/services/`: reservado para regras de negócio e orquestração de operações.
- `src/repositories/`: reservado para acesso e persistência dos dados.

### `frontend/`

- `package.json`: dependências e scripts do Create React App.
- `public/index.html`: documento HTML raiz da aplicação.
- `src/index.jsx`: ponto de entrada que monta a aplicação React.
- `src/App.jsx`: componente raiz da interface.
- `src/components/`: reservado para componentes JSX reutilizáveis.
- `src/pages/`: reservado para páginas da aplicação.
- `src/layouts/`: reservado para estruturas compartilhadas entre páginas.
- `src/services/`: reservado para comunicação com a API e outros serviços externos.
- `src/hooks/`: reservado para hooks React reutilizáveis.
- `src/styles/`: estilos globais e estilos da interface.
- `src/assets/`: reservado para imagens, ícones e outros recursos estáticos.
- `src/utils/`: reservado para funções auxiliares.
- `src/reportWebVitals.js`: arquivo padrão do Create React App para métricas de desempenho.
- `src/setupTests.js`: arquivo reservado para configurações globais de testes.

As pastas reservadas podem permanecer vazias nesta etapa. Quando arquivos forem adicionados, eles devem seguir a responsabilidade descrita acima. Cada aplicação possui seu próprio `package.json`; instale e execute os comandos usando o diretório correspondente ou a opção `--prefix`.
