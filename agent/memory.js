/**
 * memory.js — Conversation history handler.
 *
 * MODULE 3 CONCEPT: What makes an agent feel intelligent is memory.
 * Without this, every message starts from scratch — the agent
 * forgets your name, your question, everything.
 *
 * How it works:
 *   The Claude API is stateless — it doesn't remember previous calls.
 *   We solve this by sending the conversation history WITH every request.
 *   The "sliding window" keeps the last N turns so we don't blow the
 *   context limit on long conversations.
 *
 * Analogy: Imagine briefing a commander before each radio call with
 * a summary of the last 10 transmissions. Same idea.
 */

// How many prior turns to include in each API call.
// 10 turns (5 user + 5 assistant) is a good balance of memory vs. cost.
const MAX_TURNS = 10;

/**
 * buildMessages — assembles the message array for the API call.
 *
 * @param {Array}  history     — full conversation history so far
 * @param {string} userMessage — the current user message to append
 * @returns {Array} — message array ready for the Anthropic API
 */
export function buildMessages(history, userMessage) {
  // Keep only the most recent turns (sliding window)
  const recentHistory = history.slice(-MAX_TURNS);

  // Append the new user message
  return [
    ...recentHistory,
    { role: 'user', content: userMessage },
  ];
}

/**
 * SESSION STORAGE NOTE:
 *
 * In this starter, history is stored in-memory per request via the
 * client (the browser sends history back each turn in the POST body).
 *
 * For production agents, you'd persist history in a database
 * (Supabase works great) keyed by session ID or phone number.
 * That's covered in Module 4's extension exercises.
 */
