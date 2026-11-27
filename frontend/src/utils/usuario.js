// Funções de apresentação do usuário logado, usadas no cabeçalho e no Feed.
const ROTULOS_TIPO = { franqueador: "Franqueador", franqueado: "Franqueado", investidor: "Investidor" };

export function primeiroNome(nome) { return nome.split(" ")[0]; }

// "Matheus Prado" vira "MP".
export function iniciais(nome) {
    return nome.split(" ").filter(parte => parte).slice(0, 2)
        .map(parte => parte[0].toUpperCase()).join("");
}

export function rotuloTipo(tipo) { return ROTULOS_TIPO[tipo] || tipo; }
