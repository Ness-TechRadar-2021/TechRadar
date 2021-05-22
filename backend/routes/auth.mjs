import express from 'express';

import { login, verifyToken } from '../controllers/auth.mjs';

const router = express.Router();

router.post(
  '/login', login,
);

router.post(
  '/token/:accessToken', verifyToken,
);

export default router;
