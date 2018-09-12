const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/nyt');

const db = require('./db');

app.post('/new-article', (req, res) => {
  db.Article.create(req.body)
    .then(() => {
      res.json({ message: 'article saved' })
    })
    .catch(error => {
      console.error(error);
      res.json({ error: error })
    });
});

app.get('/articles', (req, res) => {
  db.Article.find({})
    .then(articles => {
      console.log('Articles sent.');
      res.json({ articles: articles })
    })
    .catch(error => {
      console.error(error);
      res.json({ error: error })
    });
});

app.delete('/delete-article', (req, res) => {
  db.Article.deleteOne({ _id: req.body.id })
    .then(() => {
      console.log('Article deleted.');
      res.json({
        message: 'Article deleted.'
      })
    })
    .catch(err => {
      console.error(err);
      res.json({
        error: err
      })
    })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});