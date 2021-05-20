import bcrypt from 'bcryptjs';
import debug from 'debug';
import http from 'http';
import mongoose from 'mongoose';

import app from '../app.mjs';

import Role from '../models/role.mjs';
import User from '../models/user.mjs';

const DB_USERNAME = 'tradmin';
const DB_PASSWORD = 'UplED3N01vnsl3KC';
const DB_DATABASE = 'trdb';

const server = http.createServer(app);
const port = process.env.PORT || 5000;

const log = debug('backend:server');

const init = () => {
  mongoose.connection.db.collection('roles').estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      const userRole = new Role({ name: 'user' });
      const adminRole = new Role({ name: 'admin' });

      userRole.save((error) => {
        if (err) {
          console.log('error', error);
        }
      });

      adminRole.save((error) => {
        if (err) {
          console.log('error', error);
        }
      });
    }
  });

  mongoose.connection.db.collection('users').estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      Role.find({ name: 'admin' })
        .then((roles) => {
          const adminUser = new User({
            username: 'admin',
            password: bcrypt.hashSync('12345', 8),
            roles,
          });

          adminUser.save((error) => {
            if (err) {
              console.log('error', error);
            }
          });
        })
        .catch((error) => console.log(error));
    }
  });
};

mongoose.connect(
  `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.lonsy.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
).then(() => {
  server.listen(port);
  init();
  log('Connected to database');
}).catch((err) => {
  log(err);
});

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;
  log(`Listening on ${bind}`);
});
