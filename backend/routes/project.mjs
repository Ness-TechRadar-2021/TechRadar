import express from 'express';

// eslint-disable-next-line object-curly-newline
import { getProjects, getProject, createProject, updateProject, removeProject } from '../controllers/project.mjs';

const router = express.Router();

router.get('/', getProjects);

router.get('/:id', getProject);

router.post('/', createProject);

router.put('/:id', updateProject);

router.delete('/:id', removeProject);

export default router;
