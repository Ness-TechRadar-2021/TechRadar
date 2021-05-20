import express from 'express';

// eslint-disable-next-line object-curly-newline
import { getBlips, getBlip, createBlip, updateBlip, removeBlip } from '../controllers/blip.mjs';

import { verifyToken, isAdmin } from '../middleware/auth.mjs';

const router = express.Router();

router.get('/', getBlips);

router.get('/:id', getBlip);

router.post('/', [verifyToken, isAdmin], createBlip);

router.put('/:id', [verifyToken, isAdmin], updateBlip);

router.delete('/:id', [verifyToken, isAdmin], removeBlip);

export default router;
