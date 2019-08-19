/* eslint-disable max-len */
const express = require('express');
const axios = require('axios');
const polyline = require('google-polyline');
const db = require('./db/db');
const {
  info,
} = require('./data');
const auth = require('./auth/index');


const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.all('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});


app.get('/locations', (req, res) => {
  const { userEmail } = req.query;
  console.log(userEmail);
  const locations = [{ lat: 29.955727, lng: -90.120515, label: "Cane's Chicken Fingers" },
    { lat: 298544655, lng: -90.055455, label: 'Home' },
    { lat: 29.951965, lng: -90.070227, label: 'Work' },
    { lat: 29.9624226, lng: -90.042877, label: 'Pizza Delicious' }];
  res.send(locations);
});

app.get('/mapSearch', (req, res) => {
  // const {
  //   place, userLoc,
  // } = req.query;
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
  // const turnByTurn = response.routes[0].legs[0].steps.map((step) => {
  //   return [`${step.html_instructions.replace(/<b>/g, "").replace(/<\/b>/g, "").replace(/<div style="font-size:0.9em">/g, ' ').replace(/<\/div>/g, '')}`, `for ${step.distance.text}/${step.duration.text}`];
  // });
  // const peterDistance = response.routes[0].legs[0].steps.map((step) => {
  //   return step.distance.text
  // });
  // const peterHTML = response.routes[0].legs[0].steps.map((step) => {
  //   return `${step.html_instructions.replace(/<b>/g, "").replace(/<\/b>/g, "").replace(/<div style="font-size:0.9em">/g, ' ').replace(/<\/div>/g, '')}`
  // });
  // const peterEndLoc = response.routes[0].legs[0].steps.map((step) => {
  //   return step.end_location
  // });
  //     res.send({ polyLine, turnByTurn, peterDistance, peterHTML, peterEndLoc });
  //   });
  //   .catch((err) => {
  //     res.send(err);
  //   });
  // test data below
  const polyLine = 'ca~uDzxxdPtAb@xAaC~CeFhD}FtDcGdGyJbA_Bl@s@b@u@~@aB|DoGbJiOBEzAeC~BqDhFyI~DoG~DuGvCaFjBuCpBeDlB`BvCnCxChCvMdLlD|CfIdHhC|BtFrElGrFZXtChBVHtB`@pAoENW`AmDXaAvCl@`B\\bLvB`FdAxKvBdKrB`Ez@z@PpGlAlj@zKv@LdD_ExBeClL}Mt@{@pA{AbD~DfAbAhBdBl@fA';
  const turnByTurn = [['Head south on N White St toward Esplanade Ave', 'for 131 ft/1 min'],
    ['Turn left at the 1st cross street onto Esplanade Ave', 'for 0.5 mi/3 mins'],
    ['Keep left to stay on Esplanade Ave', 'for 0.4 mi/1 min'],
    ['Turn right onto N Claiborne Ave', 'for 0.4 mi/1 min'],
    ['Turn right onto Orleans Ave', 'for 223 ft/1 min'],
    ['Turn right to merge onto I-10 W', 'for 1.1 mi/2 mins'],
    ['Take the U.S. 90 business W exit on the left toward Westbank/Claiborne Avenue', 'for 0.4 mi/1 min'],
    ['Keep left and merge onto US-90 BUS W', 'for 1.2 mi/2 mins'],
    ['Take exit 11 toward Tchoupitoulas St/S Peters St', 'for 0.3 mi/1 min'],
    ['Merge onto Calliope St', 'for 0.1 mi/1 min'],
    ['Turn right onto Tchoupitoulas St', 'for 0.3 mi/1 min'],
    ['Continue straight onto Religious St', 'for 0.4 mi/1 min'],
    ['Turn right onto Felicity St', 'for 92 ft/1 min'],
    ['Turn left onto Rousseau St Destination will be on the left', 'for 0.2 mi/1 min']];
  const peterHTML = ['Head south on N White St toward Esplanade Ave',
    'Turn left at the 1st cross street onto Esplanade Ave',
    'Keep left to stay on Esplanade Ave',
    'Turn right onto N Claiborne Ave',
    'Turn right onto Orleans Ave',
    'Turn right to merge onto I-10 W',
    'Take the U.S. 90 business W exit on the left toward Westbank/Claiborne Avenue',
    'Keep left and merge onto US-90 BUS W',
    'Take exit 11 toward Tchoupitoulas St/S Peters St',
    'Merge onto Calliope St',
    'Turn right onto Tchoupitoulas St',
    'Continue straight onto Religious St',
    'Turn right onto Felicity St',
    'Turn left onto Rousseau St Destination will be on the left'];
  const peterDistance = ['131 ft',
    '0.5 mi',
    '0.4 mi',
    '0.4 mi',
    '223 ft',
    '1.1 mi',
    '0.4 mi',
    '1.2 mi',
    '0.3 mi',
    '0.1 mi',
    '0.3 mi',
    '0.4 mi',
    '92 ft',
    '0.2 mi'];
  const peterEndLoc = [{ lat: 29.9776004, lng: -90.0804337 },
    { lat: 29.9726067, lng: -90.0734555 },
    { lat: 29.96945, lng: -90.068823 },
    { lat: 29.9644667, lng: -90.07329279999999 },
    { lat: 29.9648359, lng: -90.07386059999999 },
    { lat: 29.9550818, lng: -90.0819113 },
    { lat: 29.9522188, lng: -90.0868912 },
    { lat: 29.9413938, lng: -90.07214610000001 },
    { lat: 29.9390935, lng: -90.0684299 },
    { lat: 29.9380873, lng: -90.06677930000001 },
    { lat: 29.93403859999999, lng: -90.0663225 },
    { lat: 29.9277401, lng: -90.06810829999999 },
    { lat: 29.9279172, lng: -90.06831419999999 },
    { lat: 29.9259759, lng: -90.0704787 }];
  console.log(place, userLoc);
  res.send({
    polyLine, turnByTurn, peterDistance, peterEndLoc, peterHTML,
  });
});

app.get('/userTotals', (req, res) => {
  console.log(req);
  const object = {
    avgSpeed: 20,
    totalDistance: 100,
    costSavings: 200,
    stationaryTime: 800,
    pieChart: [{ Speed: '< 25%', Amount: 20 }, { Speed: '25% - 50%', Amount: 40 }, { Speed: '50% - 75%', Amount: 50 }, { Speed: '> 75%', Amount: 10 }],
  };
  res.send(object);
});


app.get('/userStats', (req, res) => {
  console.log(req);
  const recentRides = [{
    avgSpeed: 10,
    totalDistance: 100,
    costSavings: 100,
    stationaryTime: 200,
    pieChart: [{ Speed: '< 25%', Amount: 10 }, { Speed: '25% - 50%', Amount: 30 }, { Speed: '50% - 75%', Amount: 30 }, { Speed: '> 75%', Amount: 30 }],
  },
  {
    avgSpeed: 20,
    totalDistance: 200,
    costSavings: 200,
    stationaryTime: 400,
    pieChart: [{ Speed: '< 25%', Amount: 20 }, { Speed: '25% - 50%', Amount: 60 }, { Speed: '50% - 75%', Amount: 50 }, { Speed: '> 75%', Amount: 10 }],
  },
  {
    avgSpeed: 30,
    totalDistance: 300,
    costSavings: 300,
    stationaryTime: 600,
    pieChart: [{ Speed: '< 25%', Amount: 20 }, { Speed: '25% - 50%', Amount: 40 }, { Speed: '50% - 75%', Amount: 50 }, { Speed: '> 75%', Amount: 80 }],
  },
  {
    avgSpeed: 40,
    totalDistance: 400,
    costSavings: 400,
    stationaryTime: 800,
    pieChart: [{ Speed: '< 25%', Amount: 30 }, { Speed: '25% - 50%', Amount: 40 }, { Speed: '50% - 75%', Amount: 70 }, { Speed: '> 75%', Amount: 10 }],
  },
  {
    avgSpeed: 50,
    totalDistance: 500,
    costSavings: 500,
    stationaryTime: 1000,
    pieChart: [{ Speed: '< 25%', Amount: 5 }, { Speed: '25% - 50%', Amount: 80 }, { Speed: '50% - 75%', Amount: 50 }, { Speed: '> 75%', Amount: 20 }],
  },
  ];
  res.send(recentRides);
});


app.get('/user/:idToken', (req, res) => {
  const {
    idToken,
  } = req.params;
  auth(idToken)
    .then((userInfo) => {
      db.getUser(userInfo.sub)
        .then((users) => {
          res.send(users[0]);
        })
        .catch((err) => {
          console.log(err);
          res.statusCode = (500);
          res.end('Something Went Wrong');
        });
    });
});
app.post('/userInfo', (req, res) => {
  console.log(req.body);
  const {
    accesstoken,
    idToken,
  } = req.body;
  auth(idToken)
    .then((userInfo) => {
      console.log(userInfo);
      db.addUser({
        googleId: userInfo.sub,
      })
        .then(() => {
          res.statusCode = 201;
          res.end('User Added');
        });
      console.log(userInfo);
    })
    .catch((err) => {
      console.error(err);
    });
});
app.patch('/user', (req, res) => {
  const {
    idToken,
    speed,
    distance,
  } = req.body;
  auth(idToken)
    .then((userInfo) => {
      db.updateUser({
        googleId: userInfo.sub,
        speed,
        distance,
      }, res);
    });
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

app.get('/stat/:username', (req, res) => {
  const {
    username,
  } = req.params;
  db.getStat(username)
    .then((something) => {
      console.log(something);
      res.send(something);
    });
});
app.post('/stat', (req, res) => {
  const {
    username,
    lineString,
  } = req.body;
  // const coords = req.body.polyline;
  // console.log(coords);
  // console.log(polyline.decode(coords));
  // res.send(polyline.decode(coords));
  db.addStat({
    username,
    lineString,
  }, res);
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
  const {
    username,
    lineString,
    routeTime,
  } = req.body;

  const coords = polyline.decode(lineString);

  db.addRide({
    username,
    lineString,
    routeTime,
  }, coords, res);

  console.log(coords);
  // console.log(polyline.decode(coords));
  // db.addRide(coords, polyline.decode(coords));
  // res.end();
});
app.patch('/ride', (req, res) => {
  res.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
