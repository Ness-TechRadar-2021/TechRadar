import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import path from 'path';

import util from './util/general-util.mjs';

import blipRouter from './routes/blip.mjs';
import errorRouter from './routes/404.mjs';
import indexRouter from './routes/index.mjs';
import projectRouter from './routes/project.mjs';

const app = express();

const dirpath = util.getCurrentDirectoryFromURL(import.meta.url);

app.set('views', path.join(dirpath, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(express.static(path.join(dirpath, 'public')));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(logger('dev'));

app.use('/', indexRouter);

app.use('/api/blips', blipRouter);

app.use('/api/projects', projectRouter);

app.use(errorRouter);

export default app;
