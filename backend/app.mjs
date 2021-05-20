import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import path from 'path';

import util from './util/general-util.mjs';

import authRouter from './routes/auth.mjs';
import blipRouter from './routes/blip.mjs';
import errorRouter from './routes/404.mjs';
import indexRouter from './routes/index.mjs';
import projectRouter from './routes/project.mjs';

const app = express();

const dirpath = util.getCurrentDirectoryFromURL(import.meta.url);

app.set('views', path.join(dirpath, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});
app.use(express.static(path.join(dirpath, 'public')));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(logger('dev'));

app.use('/', indexRouter);

app.use('/api/auth', authRouter);

app.use('/api/blips', blipRouter);

app.use('/api/projects', projectRouter);

app.use(errorRouter);

export default app;
