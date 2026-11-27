// Toda resposta de erro sai no formato { erro: "mensagem" }, que é o que o front lê.
export default function errorHandler(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido' });
  }

  const status = err.status || 500;
  if (status === 500) console.error(err);

  res.status(status).json({
    erro: status === 500 ? 'Erro interno do servidor' : err.message,
  });
}
