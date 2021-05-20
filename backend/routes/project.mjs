import express from 'express';

// eslint-disable-next-line object-curly-newline
import { getProjects, getProject, createProject, updateProject, removeProject } from '../controllers/project.mjs';

import { verifyToken, isAdmin } from '../middleware/auth.mjs';

const router = express.Router();

router.get('/', getProjects);

router.get('/:id', getProject);

router.post('/', [verifyToken, isAdmin], createProject);

router.put('/:id', [verifyToken, isAdmin], updateProject);

router.delete('/:id', [verifyToken, isAdmin], removeProject);

export default router;
