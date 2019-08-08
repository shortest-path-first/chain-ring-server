const express = require('express');
const db = require('./db/db');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
