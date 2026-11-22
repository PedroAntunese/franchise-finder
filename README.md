# Franchise Finder

Projeto integrador organizado em duas aplicações independentes:

- **`backend/`**: API REST em Node.js com Express, MySQL (hospedado no Aiven) e autenticação JWT.
- **`frontend/`**: interface em React com Create React App.

Cada aplicação tem o próprio `package.json` e é instalada e executada separadamente.

## Requisitos

- Node.js 20 ou superior
- npm
- Acesso ao serviço MySQL do projeto no Aiven (host, porta, usuário, senha, banco e certificado CA)

## Configuração do backend

### 1. Crie o `.env` dentro de `backend/`

O backend só lê o arquivo `backend/.env`. Um `.env` na raiz do projeto **não** é carregado.

Copie o modelo da raiz para dentro do backend:

```powershell
Copy-Item .env.example backend\.env
```

Depois, abra `backend/.env` e preencha as variáveis abaixo.

| Variável | O que colocar |
|---|---|
| `PORT` | Porta da API. Use `3001`, porque o frontend usa a `3000`. |
| `NODE_ENV` | `development` na sua máquina. |
| `DB_HOST` | Host do MySQL no Aiven (termina em `aivencloud.com`). |
| `DB_PORT` | Porta do serviço no Aiven. Não é a 3306 padrão. |
| `DB_USER` | Usuário do banco. |
| `DB_PASSWORD` | Senha do banco. |
| `DB_NAME` | Nome do banco. |
| `DB_CA_CERT` | Certificado CA do Aiven em base64. Já vem preenchido no `.env.example` (veja o passo 2). |
| `JWT_SECRET` | Segredo para assinar os tokens (veja o passo 3). |
| `JWT_EXPIRES` | Validade do token, por exemplo `1d`. Se ficar vazio, o padrão é `1d`. |

Os dados de conexão ficam no console do Aiven, na página **Overview** do serviço MySQL, na seção **Connection information**.

### 2. Gere o `DB_CA_CERT`

O Aiven usa conexão criptografada (TLS), e a API precisa do certificado CA para validar o servidor.

O certificado CA é público e é o mesmo para todo o time. Ele não é uma senha: serve só para confirmar que a conexão é com o servidor do Aiven.

Por isso, o `.env.example` já traz o `DB_CA_CERT` preenchido em base64. Ao copiar o exemplo para `backend/.env`, esse valor já vem pronto, e não é preciso fazer mais nada.

### 3. Gere o `JWT_SECRET`

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Cole o resultado em `JWT_SECRET=`. Cada pessoa pode gerar o próprio segredo para rodar na sua máquina, e cada ambiente (homologação e produção) deve ter o seu.

### 4. Instale as dependências

```powershell
cd backend
npm ci
```

Use `npm ci` para instalar exatamente as versões do `package-lock.json`. Para **adicionar** uma dependência nova, rode `npm install --save-exact <pacote>` **dentro de `backend/`**, e nunca na raiz do projeto.

## Configuração do frontend

### 1. Crie o `.env` dentro de `frontend/`

O Create React App também só lê o `.env` da própria pasta. Crie `frontend/.env` com:

```
REACT_APP_API_URL=http://localhost:3001/api
```

### 2. Instale as dependências

```powershell
cd frontend
npm ci
```

## Como rodar

Abra dois terminais.

**Terminal 1: API**

```powershell
cd backend
npm run dev
```

Se tudo estiver certo, aparece:

```
Conectado ao MySQL!
Backend running on port 3001
```

A API só sobe se conseguir conectar ao banco. O `npm run dev` reinicia sozinho quando um arquivo do código muda, mas **não** acompanha mudanças no `.env`: depois de editar o `.env`, pare com `Ctrl+C` e rode de novo.

**Terminal 2: frontend**

```powershell
cd frontend
npm start
```

O frontend abre em `http://localhost:3000`.

## Endpoints da API

Todos os endpoints ficam sob `http://localhost:3001/api`.

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| `POST` | `/auth/cadastro` | Não | Cadastra uma conta de `franquia` ou `franqueado`. |
| `POST` | `/auth/login` | Não | Retorna o token JWT e os dados do usuário. |
| `GET` | `/usuarios` | Sim | Lista os usuários. |
| `GET` | `/usuarios/:id` | Sim | Busca um usuário pelo id. |
| `PUT` | `/usuarios/:id` | Sim, só a própria conta | Atualiza nome e e-mail. |
| `DELETE` | `/usuarios/:id` | Sim, só a própria conta | Remove a conta. |

Nas rotas autenticadas, envie o token no cabeçalho `Authorization: Bearer <token>`.

## Problemas comuns

| Mensagem | Causa provável | O que fazer |
|---|---|---|
| `Access denied for user ''@'localhost' (using password: NO)` | O `.env` não foi encontrado, então as variáveis do banco chegaram vazias. | Confira se o arquivo está em `backend/.env`, e não na raiz. |
| `Defina JWT_SECRET no .env` | O `JWT_SECRET` está vazio. | Gere um segredo (passo 3 do backend) e reinicie a API. |
| `self-signed certificate in certificate chain` | O `DB_CA_CERT` está vazio, incompleto ou é de outro projeto do Aiven. | Gere o base64 de novo a partir do `ca.pem` do serviço certo. |
| Timeout ao conectar | O IP da sua máquina não está liberado no Aiven. | Confira o **IP Filter** do serviço no console do Aiven. |
| `Cannot find package '...'` | Dependências não instaladas, ou instaladas na raiz. | Rode `npm ci` dentro de `backend/` ou `frontend/`. |

## Integração contínua (CI)

Cada pull request e cada push na `main` rodam o workflow `.github/workflows/ci.yml` no GitHub Actions:

- **Backend:** instala as dependências e verifica o código.
- **Frontend:** instala as dependências, roda os testes e gera o build de produção.

O CI não usa o banco do Aiven nem precisa de nenhum `.env`. Se um job falhar, o resultado aparece no pull request e na aba **Actions** do repositório.

## Estrutura

### Raiz

- `.env.example`: modelo das variáveis de ambiente, sem segredos. Copie para `backend/.env` e preencha.
- `.gitignore`: exclui dependências, builds, logs e arquivos `.env`.
- `.github/workflows/`: workflows do GitHub Actions.
- `README.md`: este documento.

### `backend/`

- `src/server.js`: ponto de entrada. Confere o `JWT_SECRET`, testa a conexão com o banco e sobe a API.
- `src/app.js`: configuração do Express (CORS, JSON, rotas e tratamento de erros).
- `src/config/env.js`: porta e ambiente da aplicação.
- `src/config/db.js`: pool de conexões com o MySQL, com TLS do Aiven. A conexão só acontece quando é usada.
- `src/routes/`: definição dos endpoints.
- `src/controller/`: recebe as requisições e devolve as respostas HTTP.
- `src/services/`: regras de negócio (validação de cadastro, login, JWT).
- `src/repositories/`: consultas ao banco.
- `src/middlewares/`: autenticação, autorização e tratamento de erros.
- `src/utils/`: funções auxiliares (validação de CPF e CNPJ, classe de erro da aplicação).

### `frontend/`

- `public/index.html`: documento HTML raiz.
- `src/index.jsx`: ponto de entrada que monta a aplicação React.
- `src/App.jsx`: componente raiz e rotas.
- `src/pages/`: telas de Login, Cadastro e Início.
- `src/styles/`: estilos globais e de cada tela.
- `src/components/`, `src/layouts/`, `src/hooks/`, `src/services/`, `src/assets/`, `src/utils/`: reservadas para os próximos passos.
- `src/setupTests.js`: configuração global dos testes.

## Segurança

- Nunca commite arquivos `.env` nem senhas.
- Os valores secretos são a senha do banco (`DB_PASSWORD`) e o `JWT_SECRET`. Eles ficam sempre vazios no `.env.example`. Compartilhe a senha do banco só por um canal seguro, como um gerenciador de senhas, e nunca por grupos de mensagem.
- O certificado CA (`DB_CA_CERT`) é público, por isso fica preenchido no `.env.example`.
- Use credenciais e segredos diferentes para desenvolvimento, homologação e produção.
- Os testes automatizados não devem acessar o banco de produção.
