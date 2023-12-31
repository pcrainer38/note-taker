const express = require('express');
const path = require('path');
const fs = require('fs');
const routes = require('./public/routes/notes');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET route for notes
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.use('/api', routes)

// GET route for homepage
app.get('*', (req, res) => 
res.sendFile(path.join(__dirname, './public/index.html'))
);

  
  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
  );