import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from './prompt.js';
import { buildMessages } from './memory.js';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * sendMessage — the core agent call.
 *
 * @param {string} userMessage — what the user just said
 * @param {Array}  history     — prior turns [{role, content}, ...]
 * @returns {Object} { reply: string, updatedHistory: Array }
 */
export async function sendMessage(userMessage, history = []) {
  // Build the message array with sliding-window memory
  const messages = buildMessages(history, userMessage);

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  });

  const reply = response.content[0].text;

  // Return the reply + updated history for the next turn
  const updatedHistory = [
    ...messages,
    { role: 'assistant', content: reply },
  ];

  return { reply, updatedHistory };
}
