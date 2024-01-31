const express = require('express');
const router = express.Router();
const fs = require('fs');
const {"v4": v4} = require('uuid');
const json_books = fs.readFileSync('src/books.json', 'utf-8');
let books = JSON.parse(json_books);

router.get('/', (req, res) => {
  res.render('index', { books });
});

router.get('/new-entry', (req, res) => {
  res.render('new-entry');
});

router.post('/new-entry', (req, res) => {

  const { titulo, descripcion, codigo, test, oraculo } = req.body;

  if (!titulo || !descripcion || !codigo || !test || !oraculo ) {
    res.status(400).send("Entries must have a title and body");
    return;
  }

  var newBook = {
    id:v4(),
    titulo,
    descripcion,
    codigo,
    test,
    oraculo
  };

  // add a new book to the array
  books.push(newBook);

  // saving the array in a file
  const json_books = JSON.stringify(books);
  fs.writeFileSync('src/books.json', json_books, 'utf-8');

  res.redirect('/');
});

router.get('/delete/:id', (req, res) => {
  books = books.filter(book => book.id != req.params.id);

  // saving data
  const json_books = JSON.stringify(books);
  fs.writeFileSync('src/books.json', json_books, 'utf-8');

  res.redirect('/')
});




module.exports = router;