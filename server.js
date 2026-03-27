import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import chatRoute from './routes/chat.js';
import healthRoute from './routes/health.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// Routes
app.use('/chat', chatRoute);
app.use('/health', healthRoute);

// Catch-all: serve the chat UI
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🔶 Agent running at http://localhost:${PORT}`);
  console.log(`   Edit agent/prompt.js to change your agent's mission.\n`);
});
