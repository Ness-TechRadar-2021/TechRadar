import { Blip } from '../models/blip.mjs';
import { Project } from '../models/project.mjs';

export function getBlips(req, res) {
  Blip.find()
    .then((blips) => {
      res.type('application/json');
      res.send(JSON.stringify(blips));
    })
    .catch((err) => console.log(err));
}

export function getBlip(req, res) {
  // eslint-disable-next-line no-underscore-dangle
  Blip.findById(req.params.id)
    .then((blip) => {
      res.type('application/json');
      res.send(JSON.stringify(blip));
    })
    .catch((err) => console.log(err));
}

export function createBlip(req, res) {
  const {
    name, description, ring, quadrant,
  } = req.body;

  const blip = new Blip({
    name,
    description,
    ring,
    quadrant,
  });

  blip.save()
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => console.error(err));
}

export function updateBlip(req, res) {
  const {
    name, description, ring, quadrant,
  } = req.body;

  Blip.updateOne({
    _id: req.params.id,
  }, {
    name,
    description,
    ring,
    quadrant,
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => console.error(err));
}

export function removeBlip(req, res) {
  Blip.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      Project.updateMany({}, {
        $pull: { blips: req.params.id },
      })
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}
