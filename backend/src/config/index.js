// Lê o .env uma vez só e entrega tudo organizado para o resto do sistema.
if (!process.env.JWT_SECRET) {
    throw new Error("Defina JWT_SECRET no arquivo .env antes de iniciar.");
}

module.exports = {
    porta: process.env.PORT || 3001,
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiraEm: process.env.JWT_EXPIRA_EM || "8h",
    banco: {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "franchise_finder"
    }
};
