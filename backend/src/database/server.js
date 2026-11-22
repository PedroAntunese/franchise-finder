import 'dotenv/config';
import app from '../app.js';

if (!process.env.JWT_SECRET) {
  console.error('Defina JWT_SECRET no .env');
  process.exit(1);
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));