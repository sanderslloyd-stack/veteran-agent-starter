import { Router } from 'express';

const router = Router();

/**
 * GET /health
 *
 * Railway (and most hosting platforms) ping this endpoint to confirm
 * the server is running. If it doesn't respond 200, Railway assumes
 * the deployment failed and rolls back.
 *
 * Keep this simple — it just needs to return 200.
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    agent: process.env.AGENT_NAME || 'veteran-agent-starter',
  });
});

export default router;
