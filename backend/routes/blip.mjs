import express from 'express';

// eslint-disable-next-line object-curly-newline
import { getBlips, getBlip, createBlip, updateBlip, removeBlip } from '../controllers/blip.mjs';

const router = express.Router();

router.get('/', getBlips);

router.get('/:id', getBlip);

router.post('/', createBlip);

router.put('/:id', updateBlip);

router.delete('/:id', removeBlip);

export default router;
