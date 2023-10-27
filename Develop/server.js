const express = require('express');
const path = require('path');
const fs = require('fs');

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

// GET route for homepage
app.get('*', (req, res) => 
res.sendFile(path.join(__dirname, './public/index.html'))
);

//API routes
app.get('/Develop/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'))
  });
  
app.post('/api/notes', (req, res) => {
    console.log(req.body);
  
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      if(err) console.log(err);
  
      const notes = JSON.parse(data);
      notes.push(req.body);
  
      fs.writeFile('./db/db.json', JSON.stringify(notes, null, 4), () => {
      console.log('Success!!')
      res.send('Test')
    })
    })
})
  
  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
  );