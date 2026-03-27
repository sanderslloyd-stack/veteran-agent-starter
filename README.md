# Forge — Veteran AI Agent Starter

**Built for the Forge Veteran AI Agent Builder Program**
*Patriots' Hall · Dripping Springs, TX · Free for Veterans*

You're looking at the Tier 2 workshop starter repo. By the end of the session, you will have a Claude-powered AI agent running at a live URL you own — built on the same architecture that powers production agents in the real estate and mortgage industries.

---

## What You're Building

A conversational AI agent with:
- A **custom identity** — you define its name, mission, and behavior
- **Conversation memory** — it remembers context within a session
- A **live HTTP endpoint** — accessible from any device, anywhere
- A **clean chat UI** — ready to share or embed in a website

---

## What You Need

Before the workshop, complete this checklist:

- [ ] **Node.js 18+** installed → [nodejs.org](https://nodejs.org) (download LTS)
- [ ] **Git** installed → [git-scm.com](https://git-scm.com)
- [ ] **Anthropic API key** → [console.anthropic.com](https://console.anthropic.com) (free account, free trial credits)
- [ ] **GitHub account** → [github.com](https://github.com) (free)
- [ ] **Railway account** → [railway.app](https://railway.app) (free tier, no credit card needed)

**Verify Node.js is installed:**
```bash
node --version
# Should print v18.x.x or higher
```

---

## Module 1 — First Contact (15 min)

Get the agent running locally on your machine.

```bash
# 1. Clone this repo
git clone https://github.com/sanova-ai/veteran-agent-starter
cd veteran-agent-starter

# 2. Create your environment file
cp .env.example .env

# 3. Open .env and paste your Anthropic API key
#    ANTHROPIC_API_KEY=sk-ant-...

# 4. Install dependencies
npm install

# 5. Start the agent
npm start

# You should see:
# 🔶 Agent running at http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
Send a message. Your agent is running.

---

## Module 2 — Write Your Mission Brief (20 min)

Open `agent/prompt.js`. This is your agent's system prompt — its **mission brief**.

Replace the placeholder text with your own:

```js
export const SYSTEM_PROMPT = `
You are [YOUR AGENT NAME], an AI assistant for [YOUR BUSINESS].

YOUR ROLE:
[What does this agent do? Who does it serve?]

WHAT YOU HELP WITH:
- [Task 1]
- [Task 2]

HOW YOU COMMUNICATE:
- Tone: [professional / friendly / direct]
- Keep responses concise unless asked for detail.

BACKGROUND KNOWLEDGE:
[Paste in info about your business, services, FAQs, hours, etc.]
`.trim();
```

**Save the file.** If you're running `npm run dev`, it restarts automatically.
Otherwise `Ctrl+C` and `npm start` again.

Test it. Notice how a different brief produces a completely different agent.

**Ideas from other veterans:**
- Freight rate inquiry bot for a logistics startup
- Lead intake agent for a veteran-owned HVAC company
- Proposal research assistant for a govcon firm
- Customer FAQ bot for a real estate team
- Career advisor for a job search

---

## Module 3 — Give It Memory (20 min)

Open `agent/memory.js` and read the comments. Memory is already wired in.

To understand it: the Claude API is **stateless** — it doesn't remember anything between calls. We solve this by sending the conversation history with every request (the last 10 turns, a "sliding window").

**Extension exercise:** Increase `MAX_TURNS` from 10 to 20. What changes? What's the tradeoff?

**Discussion:** Where else could you store history?
- In-memory (what we're doing) — fast, resets on restart
- Supabase / PostgreSQL — persistent, survives restarts, per-user
- Redis — fast + persistent, good for high-volume agents

---

## Module 4 — Deploy to Railway (35 min)

Get your agent live at a public URL.

### Step 1: Push your code to GitHub

```bash
# Initialize git (if you cloned, skip this)
git init
git add .
git commit -m "my first agent"

# Create a repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
git push -u origin main
```

### Step 2: Deploy on Railway

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repo
4. Click **"Variables"** → add your environment variables:
   - `ANTHROPIC_API_KEY` → your key from console.anthropic.com
   - `AGENT_NAME` → your agent's name
5. Railway builds and deploys automatically

### Step 3: Get your URL

In the Railway dashboard, go to **Settings** → **Networking** → **Generate Domain**.

Your agent is now live at `your-agent-name.up.railway.app`.

**That's your live URL.** Send it to someone. It works from any device.

---

## After the Workshop — What's Next

You now have production infrastructure. Here's how veterans have extended it:

| Extension | What it adds | Difficulty |
|-----------|-------------|------------|
| Custom domain | `myagent.com` instead of railway URL | Easy |
| Supabase logging | Store every conversation in a database | Medium |
| Twilio SMS | Agent responds to text messages | Medium |
| Website embed | Drop the agent into any site via iframe | Easy |
| Auth | Require a password or API key to use your agent | Medium |
| Tools | Let the agent search the web, check a calendar, etc. | Advanced |

---

## File Structure

```
veteran-agent-starter/
├── agent/
│   ├── index.js      ← Anthropic API call (the brain)
│   ├── prompt.js     ← System prompt — YOU EDIT THIS (Module 2)
│   └── memory.js     ← Conversation history handler (Module 3)
├── routes/
│   ├── chat.js       ← POST /chat endpoint
│   └── health.js     ← GET /health (Railway needs this)
├── public/
│   └── index.html    ← Chat UI (zero dependencies)
├── server.js         ← Express entry point
├── .env.example      ← Copy this to .env
├── railway.json      ← One-click Railway deploy config
└── package.json
```

---

## About Forge

The **Forge Veteran AI Agent Builder Program** is a free, hands-on AI upskilling program for veterans held at Patriots' Hall in Dripping Springs, Texas.

Created by **Jason Sanders** — USMC veteran, software developer, and founder of [Sanōva AI](https://sanova.ai), which deploys production AI agents for real estate and mortgage professionals.

**Contact:** jason@sanova.ai

---

*Built for veterans. Production-ready from day one.*
