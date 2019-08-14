/* eslint-disable max-len */
const express = require('express');
const axios = require('axios');
const polyline = require('google-polyline');
const db = require('./db/db');
const { info } = require('./data');


const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/mapSearch', (req, res) => {
  const {
    place, userLoc,
  } = req.query;
  console.log(place, userLoc);
  // axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLoc}&radius=8000&keyword=${place}&key=AIzaSyAm0rv3w8tQUIPbjDkQyGhQUsK5rAxfBUs`)
  //   .then((response) => {
  //     const filteredResults = response.data.results.map(obj => [obj.geometry.location, obj.name, obj.vicinity]);
  //     res.send(filteredResults);
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });
  // test data below
  const filteredResults = info.results.map(obj => [obj.geometry.location, obj.name, obj.vicinity]);
  res.send(filteredResults);
});

app.get('/mapPolyline', (req, res) => {
  // need to pass in location dynamically
  const { place, userLoc } = req.query;
  // axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${userLoc}&destination=${place}&key=AIzaSyAm0rv3w8tQUIPbjDkQyGhQUsK5rAxfBUs&mode=bicycling`)
  //   .then((response) => {
  //     const polyLine = response.data.routes[0].overview_polyline.points;
  //     const turnByTurn = response.routes[0].legs[0].steps.map((step) => {
  //       return [step.distance.text, step.duration.text, step.html_instructions.replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/<div style="font-size:0.9em">/g, ' ').replace(/<\/div>/g, '')];
  //     });
  //     res.send({ polyLine, turnByTurn });
  //   });
  //   .catch((err) => {
  //     res.send(err);
  //   });
  // test data below
  const polyLine = 'ca~uDzxxdPtAb@xAaC~CeFhD}FtDcGdGyJbA_Bl@s@b@u@~@aB|DoGbJiOBEzAeC~BqDhFyI~DoG~DuGvCaFjBuCpBeDlB`BvCnCxChCvMdLlD|CfIdHhC|BtFrElGrFZXtChBVHtB`@pAoENW`AmDXaAvCl@`B\\bLvB`FdAxKvBdKrB`Ez@z@PpGlAlj@zKv@LdD_ExBeClL}Mt@{@pA{AbD~DfAbAhBdBl@fA';
  const turnByTurn = [['131 ft', '1 min', 'Head south on N White St toward Esplanade Ave'],
    ['0.5 mi', '3 mins', 'Turn left at the 1st cross street onto Esplanade Ave'],
    ['0.4 mi', '1 min', 'Keep left to stay on Esplanade Ave'],
    ['0.4 mi', '1 min', 'Turn right onto N Claiborne Ave'],
    ['223 ft', '1 min', 'Turn right onto Orleans Ave'],
    ['1.1 mi', '2 mins', 'Turn right to merge onto I-10 W'],
    ['0.4 mi', '1 min', 'Take the U.S. 90 business W exit on the left toward Westbank/Claiborne Avenue'],
    ['1.2 mi', '2 mins', 'Keep left and merge onto US-90 BUS W'],
    ['0.3 mi', '1 min', 'Take exit 11 toward Tchoupitoulas St/S Peters St'],
    ['0.1 mi', '1 min', 'Merge onto Calliope St'],
    ['0.3 mi', '1 min', 'Turn right onto Tchoupitoulas St'],
    ['0.4 mi', '1 min', 'Continue straight onto Religious St'],
    ['92 ft', '1 min', 'Turn right onto Felicity St'],
    ['0.2 mi', '1 min', 'Turn left onto Rousseau St Destination will be on the left']];
  console.log(place, userLoc);
  res.send({ polyLine, turnByTurn });
});

app.get('/userTotals', (req, res) => {
  console.log(req);
  const object = {
    avgSpeed: 20,
    totalDistance: 100,
    costSavings: 200,
    stationaryTime: 800,
  };
  res.send(object);
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
