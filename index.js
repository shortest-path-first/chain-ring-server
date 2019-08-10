const express = require('express');
const axios = require('axios');
const polyline = require('google-polyline');
const db = require('./db/db');
const { info } = require('./data');


const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/mapSearch', (req, res) => {
  // const {
  //   place,
  // } = req.query;
  // axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=30, -90&radius=8000&keyword=${place}&key=AIzaSyAm0rv3w8tQUIPbjDkQyGhQUsK5rAxfBUs`)
  // .then((response)=> {
  //   console.log(response);
  //   res.send(response.data);
  // })
  // .catch((err) =>{
  //   res.send(err);
  // })
  res.send(info);
});

app.get('/user/:username', (req, res) => {
  console.log(req.params.username);
  const {
    username,
  } = req.params;
  db.getUser(username)
    .then((users) => {
      res.send(users[0]);
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = (500);
      res.end('Something Went Wrong');
    });
});
app.post('/user', (req, res) => {
  console.log(req.body);
  const {
    username,
  } = req.body;
  db.addUser(username)
    .then(() => {
      res.statusCode = 201;
      res.end('User Added');
    });
});
app.patch('/user', (req, res) => {
  const {
    name,
    speed,
    distance,
  } = req.body;
  db.updateUser({
    name,
    speed,
    distance,
  }, res);
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
  db.getStat('Peter')
    .then((something) => {
      console.log(something);
    });
  res.end();
});
app.post('/stat', (req, res) => {
  // const coords = req.body.polyline;
  // console.log(coords);
  // console.log(polyline.decode(coords));
  // res.send(polyline.decode(coords));
  db.addStat({ username: 'Peter', lineString: 'yd}uDhjsdPaBH@l@t@lZ|@r]ZpMDjDFl@IfAIRiB`AsElBaEpB{Ax@gAf@oB`AcBz@sFjCgLtF{G~CiB~@gAh@[TaBn@eAh@{BbAaHdD_EnBsAj@iCr@uAlAi@XgFdCaHhDiFdCaGrC}BfAcEjBmEvB{OnHs@^LlEl@jUFrB@`BExCOpBc@hCYhAa@dAgGjNIPUTOLa@PUDMHQ^?d@@F@F?j@CTCTMToDdIhE`C|@Xh@^p@Xx@L\\@h@Eb@U~@S' }, res);
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
  const coords = req.body.polyline;
  console.log(coords);
  console.log(polyline.decode(coords));
  db.addRide(coords, polyline.decode(coords));
  res.end();
});
app.patch('/ride', (req, res) => {
  res.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
