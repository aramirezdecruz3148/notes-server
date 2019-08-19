const { Router } = require('express');
const Note = require('../models/Note');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title, 
      note
    } = req.body;

    Note
      .create({ title, note })
      .then(note => res.send(note))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Note
      .find()
      .select({
        _id: true,
        title: true,
        note: true
      })
      .then(notes => res.send(notes))
      .catch(next);
  });
