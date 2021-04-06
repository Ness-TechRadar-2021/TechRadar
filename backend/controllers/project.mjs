import { Blip } from '../models/blip.mjs';
import { Project } from '../models/project.mjs';

export function getProject(req, res) {
  Project.findById(req.params.id)
    .then((project) => {
      res.type('application/json');
      res.send(JSON.stringify(project));
    })
    .catch((err) => console.error(err));
}

export function getProjects(req, res) {
  Project.find()
    .then((projects) => {
      res.type('application/json');
      res.send(JSON.stringify(projects));
    })
    .catch((err) => console.error(err));
}

export function createProject(req, res) {
  const {
    name, description, blips,
  } = req.body;
  const foundBlips = [];

  if (blips) {
    blips.forEach((blip) => {
      // eslint-disable-next-line no-underscore-dangle
      Blip.findById(blip._id)
        .then((foundBlipObj) => {
          foundBlips.push(foundBlipObj);
        })
        .catch((err) => console.error(err));
    });
  }

  setTimeout(() => {
    const project = new Project({
      name,
      description,
      blips: foundBlips,
    });

    project.save()
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => console.error(err));
  }, 1000);
}

export function updateProject(req, res) {
  const {
    name, description, blips,
  } = req.body;

  Project.updateOne({
    _id: req.params.id,
  }, {
    name,
    description,
    blips,
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => console.error(err));
}

export function removeProject(req, res) {
  Project.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => console.error(err));
}
