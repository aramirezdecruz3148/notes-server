const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50
  },
  note: {
    type: String,
    required: true,
    maxlength: 120
  }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
