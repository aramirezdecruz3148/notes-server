require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Note = require('../lib/models/Note');

describe('notes routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a note', () => {
    return request(app)
      .post('/api/v1/notes')
      .send({
        title: 'Title of note',  
        note: 'The body of the note'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Title of note',  
          note: 'The body of the note', 
          __v: 0
        });
      });
  });

  it('can get all notes', async() => {
    const note = await Note.create([{
      title: 'Title of note',  
      note: 'The body of the note'
    },
    {
      title: 'Title of note2',  
      note: 'The body of the note2'
    }]);

    return request(app)
      .get('/api/v1/notes')
      .then(res => {
        const notesJSON = JSON.parse(JSON.stringify(note));
        notesJSON.forEach(note => {
          expect(res.body).toContainEqual({ title: note.title, note: note.note, _id: note._id });
        });
      });
  });
});
