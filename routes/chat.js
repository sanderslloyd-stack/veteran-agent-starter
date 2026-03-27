import { Router } from 'express';
import { sendMessage } from '../agent/index.js';

const router = Router();

/**
 * POST /chat
 *
 * Request body:
 *   { message: string, history: Array }
 *
 * Response:
 *   { reply: string, history: Array }
 *
 * The client sends its local history with every request and receives
 * the updated history back. This keeps the server stateless while
 * still giving the agent conversation memory.
 */
router.post('/', async (req, res) => {
  const { message, history = [] } = req.body;

  // Basic input validation
  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: 'Message is required.' });
  }

  if (message.length > 4000) {
    return res.status(400).json({ error: 'Message too long (max 4000 chars).' });
  }

  try {
    const { reply, updatedHistory } = await sendMessage(message.trim(), history);
    res.json({ reply, history: updatedHistory });
  } catch (err) {
    console.error('Agent error:', err.message);

    // Surface a clean error — don't leak stack traces to the client
    if (err.status === 401) {
      return res.status(500).json({ error: 'Invalid API key. Check your .env file.' });
    }
    if (err.status === 429) {
      return res.status(429).json({ error: 'Rate limited. Try again in a moment.' });
    }

    res.status(500).json({ error: 'Something went wrong. Check the server logs.' });
  }
});

export default router;
