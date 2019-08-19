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
  });
