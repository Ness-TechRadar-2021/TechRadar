import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/user.mjs';

// eslint-disable-next-line import/prefer-default-export
export const login = (req, res) => {
  User.findOne({ username: req.body.username }).populate('roles', '-__v')
    .then((user, err) => {
      if (err) {
        return res.sendStatus(500);
      }

      if (!user) {
        return res.sendStatus(404);
      }

      const invalidPassword = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!invalidPassword) {
        return res.status(401).send({
          accessToken: null,
        });
      }

      const token = jwt.sign({ id: user.id }, 'larisa-e-un-mango', {
        expiresIn: 86400,
      });

      return res.status(200).send({
        // eslint-disable-next-line no-underscore-dangle
        id: user._id,
        username: user.username,
        roles: user.roles,
        accessToken: token,
      });
    }).catch((err) => {
      console.log(err);
    });
};
