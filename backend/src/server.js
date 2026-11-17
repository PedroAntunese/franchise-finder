import app from './app.js';
import { env } from './config/env.js';

if (!process.env.JWT_SECRET) {
  console.error('Defina JWT_SECRET no .env');
  process.exit(1);
}

app.listen(env.port, () => {
  console.log(`Backend running on port ${env.port}`);
});
