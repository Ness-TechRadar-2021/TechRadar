/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

import User from '../models/user.mjs';
import Role from '../models/role.mjs';

export const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, 'larisa-e-un-mango', (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.userId = decoded.id;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      Role.find(
        { _id: { $in: user.roles } },
        (err, roles) => {
          if (err) {
            res.sendStatus(500);
            return;
          }

          const isUserAdmin = roles.find((role) => role.name === 'admin');

          if (isUserAdmin) {
            next();
            return;
          }

          res.sendStatus(403);
        },
      );
    }).catch((err) => {
      if (err) {
        res.sendStatus(500);
      }
    });
};

const authMiddleware = {
  verifyToken,
  isAdmin,
};

export default authMiddleware;
