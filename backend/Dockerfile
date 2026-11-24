# Estágio 1: instala só as dependências de produção
FROM node:26-alpine AS deps
WORKDIR /app

# Mesma versão do npm do time e do CI, para o package-lock.json ser aceito
RUN npm install -g npm@12.2.1

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Estágio 2: imagem final, só com o necessário para rodar
FROM node:26-alpine
ENV NODE_ENV=production
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src

# Roda sem privilégios de administrador
USER node

EXPOSE 3001

# O Docker consulta esta rota para saber se a API está respondendo
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://localhost:' + (process.env.PORT || 3001) + '/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "src/server.js"]
