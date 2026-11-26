// AJUSTE esta lista para os mesmos valores de "tipo" que o front usa (utils/usuario.js).
const TIPOS_VALIDOS = ["franquia", "franqueador", "investidor"];

function emailValido(email) {
    return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = { TIPOS_VALIDOS, emailValido };
