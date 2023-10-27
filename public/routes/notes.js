const notes = require('express').Router();
const {v4: uuidv4} = require('uuid');
const {
    readFromFile,
    readAndAppend,
} = require('../../helpers/fsUtils');

// GET Route for retrieving all the
notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific note
notes.get('/notes/:note_id', (req, res) => {
    const noteID = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_id === noteID);
            return result.length > 0
            ? res.json(result)
            : res.json('No note with that ID');
        });
});

// POST Route for a new note
notes.post('/notes', (req, res) => {
    console.log(req.body);

    const { title, text, note_id } = req.body;

    if (req.body) {
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4(),
        };

        

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully');
    } else {
        res.error('Error in adding note');
    }
});

module.exports = notes;



