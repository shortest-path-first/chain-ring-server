const express = require('express');
const db = require('./db/db');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/user', (req, res) => {
  const { username } = req.body;
  db.getUser(username)
    .then((users) => {
      res.send(users[0]);
    });
});
app.post('/user', (req, res) => {
  console.log(req.body);
  const { username } = req.body;
  db.addUser(username)
    .then(() => {
      res.statusCode = 201;
      res.end('User Added');
    });
});
app.patch('/user', (req, res) => {
  const { name, speed, distance } = req.body;
  db.updateUser({ name, speed, distance }, res);
});

app.get('/marker', (req, res) => {
  res.end();
});
app.post('/marker', (req, res) => {
  res.end();
});
app.patch('/marker', (req, res) => {
  res.end();
});

app.get('/location', (req, res) => {
  res.end();
});
app.post('/location', (req, res) => {
  res.end();
});
app.patch('/location', (req, res) => {
  res.end();
});

app.get('/stat', (req, res) => {
  res.end();
});
app.post('/stat', (req, res) => {
  res.end();
});
app.patch('/stat', (req, res) => {
  res.end();
});

app.get('/route', (req, res) => {
  res.end();
});
app.post('/route', (req, res) => {
  res.end();
});
app.patch('/route', (req, res) => {
  res.end();
});

app.get('/ride', (req, res) => {
  res.end();
});
app.post('/ride', (req, res) => {
  res.end();
});
app.patch('/ride', (req, res) => {
  res.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
