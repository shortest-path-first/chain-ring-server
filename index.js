const express = require('express');
const axios = require('axios');
const polyline = require('google-polyline');
const db = require('./db/db');
const { info } = require('./data');


const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(express.json());

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
  const filteredResults = info.results.map(obj => [obj.geometry.location, obj.name, obj.vicinity]);
  res.send(filteredResults);
});

app.get('/mapPolyline', (req, res) => {
  // need to pass in location dynamically

  const { place } = req.query;
  // axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=29.977830, -90.079930&destination=${place}&key=AIzaSyAm0rv3w8tQUIPbjDkQyGhQUsK5rAxfBUs&mode=bicycling`)
  //   .then((response)=> {
  //     let polyLine = response.data.routes[0].overview_polyline.points
  //     res.send({polyLine});
  //   })
  //   .catch((err) =>{
  //     res.send(err);
  //   });

  const polyLine = 'ca~uDzxxdPtAb@xAaC~CeFhD}FtDcGdGyJbA_Bl@s@b@u@~@aB|DoGbJiOBEzAeC~BqDhFyI~DoG~DuGvCaFjBuCpBeDlB`BvCnCxChCvMdLlD|CfIdHhC|BtFrElGrFZXtChBVHtB`@pAoENW`AmDXaAvCl@`B\\bLvB`FdAxKvBdKrB`Ez@z@PpGlAlj@zKv@LdD_ExBeClL}Mt@{@pA{AbD~DfAbAhBdBl@fA';
  console.log(place);
  res.send({ polyLine });
});


app.get('/user/:username', (req, res) => {
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
  const { markers } = req.body;
  console.log(markers);
  db.addMarker(markers);
  res.statusCode = 201;
  res.end('Rides sent');
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
  // req.body contains pathpolyline, first and last points with timestamps
  console.log(req.body);
  res.statusCode = 201;
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
