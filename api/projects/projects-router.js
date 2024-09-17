const express = require('express');

const Project = require('./projects-model')
const router = express.Router();

router.get('/', (req, res) => {
  Project.get()
    .then(action => {
      res.status(200).json(action)
    })
    .catch(() => {
      res.status(400).json({ error: "could not find the actions you were looking for" })
    })
});

router.get('/:id', (req, res) => {
  Project.get(req.params.id)
    .then(action => {
      if(action) {
        res.status(200).json(action)
      } else {
        res.status(404).json({ message: 'action not found, ID required' })
      }
    })
    .catch(() => {
      res.status(400).json({ error: `could not find the actions with id of ${req.params.id}` })
    })
});

router.get('/:id/actions', (req, res) => {
  Project.get(req.params.id)
    .then(action => {
      // if(action) {
        res.status(200).json(action.actions)
      // } else {
      //   res.status(404).json({ message: 'action not found, ID required' })
      // }
    })
    .catch(() => {
      res.status(400).json({ error: `could not find the actions with id of ${req.params.id}` })
    })
});

router.post('/', (req, res) => {
  // const { name, description, completed } = req.body
  Project.insert(req.body)
    .then(action => {
      // if(name && description && completed) {
        res.status(201).json(action)
      // } else {
        // res.status(400).json({ message: "please provide action info"})
      // }
    })
    .catch(error => {
      res.status(400).json(error)
    })
});

router.put('/:id', (req, res) => {
  // const { name, description, completed } = req.body
  Project.update(req.params.id, req.body)
    .then(action => {
      // if(req.params.id && name && description && completed) {
        res.status(200).json(action)
      // } else {
      //   res.status(400).json({ message: "please provide id and action info"})
      // }
    })
    .catch(error => {
      res.status(400).json(error)
    })
});

router.delete('/:id', (req, res) => {
  Project.remove(req.params.id)
  .then(action => {
    if(action) {
      res.status(200).json({ message: "the action has been deleted" })
    } else {
      res.status(404).json({ message: 'action not found, ID required' })
    }
  })
  .catch(() => {
    res.status(400).json({ error: `could not find the actions with id of ${req.params.id}` })
  })
});

module.exports = router