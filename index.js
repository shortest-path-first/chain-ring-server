/* eslint-disable no-plusplus */
/* eslint-disable max-len */
const express = require('express');
const axios = require('axios');
const polyline = require('google-polyline');
const sha = require('sha1');
const db = require('./db/db');
const {
  info,
} = require('./data');
const auth = require('./auth/index');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const usedTokens = [];
const makeRandom = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  const length = Math.random() * (150 - 100) + 100;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  if (usedTokens.includes(result)) {
    return makeRandom();
  }
  return result;
};

app.all('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});


app.get('/locations', (req, res) => {
  const { userEmail } = req.query;
  console.log(userEmail);
  const locations = [{ lat: 29.955727, lng: -90.120515, label: "Cane's Chicken Fingers" },
    { lat: 29.8544655, lng: -90.055455, label: 'Home' },
    { lat: 29.951965, lng: -90.070227, label: 'Work' },
    { lat: 29.9624226, lng: -90.042877, label: 'Pizza Delicious' }];
  res.send(locations);
});

app.get('/mapSearch', (req, res) => {
  const {
    place, userLoc,
  } = req.query;
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
  //     console.log(response.data);
  //     const polyLine = response.data.routes[0].overview_polyline.points;
  //     const turnByTurn = response.data.routes[0].legs[0].steps.map(step => [`${step.html_instructions.replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/<div style="font-size:0.9em">/g, ' ').replace(/<\/div>/g, '')}`, `for ${step.distance.text}/${step.duration.text}`]);
  //     const peterRide = response.data.routes[0].legs[0].steps;
  //     // console.log(polyLine, turnByTurn, peterDistance, peterHTML, peterEndLoc);
  //     res.send({
  //       polyLine, turnByTurn, peterRide,
  //     });
  //   })
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

  const peterRide = [{
    distance: { text: '151 ft', value: 46 },
    duration: { text: '1 min', value: 8 },
    end_location: { lat: 29.9514906, lng: -90.0700335 },
    html_instructions:
      'Head <b>south</b> on <b>St Charles Ave</b> toward <b>Gravier St</b>',
    polyline: { points: 'i~xuD|wvdPnAV' },
    start_location: { lat: 29.9518948, lng: -90.0699131 },
    travel_mode: 'BICYCLING',
  },
  {
    distance: { text: '410 ft', value: 125 },
    duration: { text: '1 min', value: 23 },
    end_location: { lat: 29.9510033, lng: -90.0688704 },
    html_instructions: 'Turn <b>left</b> onto <b>Gravier St</b>',
    maneuver: 'turn-left',
    polyline: { points: 'y{xuDtxvdPpAkE?CBGJO' },
    start_location: { lat: 29.9514906, lng: -90.0700335 },
    travel_mode: 'BICYCLING',
  },
  {
    distance: { text: '0.1 mi', value: 201 },
    duration: { text: '1 min', value: 35 },
    end_location: { lat: 29.9526685, lng: -90.06811239999999 },
    html_instructions: 'Turn <b>left</b> onto <b>Camp St</b>',
    maneuver: 'turn-left',
    polyline: { points: 'wxxuDlqvdPgCk@_@IKEQGw@WOEKEQMIIEEQQ' },
    start_location: { lat: 29.9510033, lng: -90.0688704 },
    travel_mode: 'BICYCLING',
  },
  {
    distance: { text: '0.3 mi', value: 556 },
    duration: { text: '2 mins', value: 127 },
    end_location: { lat: 29.956613, lng: -90.06456329999999 },
    html_instructions: 'Continue onto <b>Chartres St</b>',
    polyline:
      { points: 'ecyuDtlvdP[Y[WmBaBaBwAw@q@kAcAqAiASSKICCuBgB}AwAm@g@CCAAII' },
    start_location: { lat: 29.9526685, lng: -90.06811239999999 },
    travel_mode: 'BICYCLING',
  },
  {
    distance: { text: '420 ft', value: 128 },
    duration: { text: '1 min', value: 25 },
    end_location: { lat: 29.955912, lng: -90.063511 },
    html_instructions: 'Turn <b>right</b> onto <b>Toulouse St</b>',
    maneuver: 'turn-right',
    polyline: { points: 'y{yuDnvudPFKBGBC@CBE@CLQdByC' },
    start_location: { lat: 29.956613, lng: -90.06456329999999 },
    travel_mode: 'BICYCLING',
  },
  {
    distance: { text: '0.2 mi', value: 377 },
    duration: { text: '1 min', value: 64 },
    end_location: { lat: 29.958589, lng: -90.061112 },
    html_instructions: 'Turn <b>left</b> onto <b>Decatur St</b>',
    maneuver: 'turn-left',
    polyline: { points: 'mwyuD|oudPiAcAwAgAqAiAi@e@i@e@qAiAiAaAs@q@' },
    start_location: { lat: 29.955912, lng: -90.063511 },
    travel_mode: 'BICYCLING',
  },
  {
    distance: { text: '0.4 mi', value: 595 },
    duration: { text: '2 mins', value: 103 },
    end_location: { lat: 29.9617966, lng: -90.0561939 },
    html_instructions: 'Continue onto <b>N Peters St</b>',
    polyline:
    {
      points:
        'ehzuD|`udPMSMSm@eAGOwBuDWe@_B{CeBoDw@_Bg@}@AEQWQ]KOU[KMGGECWQ',
    },
    start_location: { lat: 29.958589, lng: -90.061112 },
    travel_mode: 'BICYCLING',
  },
  {
    distance: { text: '0.4 mi', value: 580 },
    duration: { text: '2 mins', value: 103 },
    end_location: { lat: 29.962302, lng: -90.05020520000001 },
    html_instructions: 'Turn <b>right</b> to stay on <b>N Peters St</b>',
    maneuver: 'turn-right',
    polyline: { points: 'g|zuDdbtdPAi@?IKuBAo@ASSaFSaFGgBOkEKeDAK?EAGAE' },
    start_location: { lat: 29.9617966, lng: -90.0561939 },
    travel_mode: 'BICYCLING',
  },
  {
    distance: { text: '436 ft', value: 133 },
    duration: { text: '1 min', value: 20 },
    end_location: { lat: 29.9634414, lng: -90.0498179 },
    html_instructions:
      '<b>N Peters St</b> turns slightly <b>left</b> and becomes <b>St Ferdinand St</b>',
    polyline: { points: 'k_{uDx|rdPCECCCAIC_B]UEwAY' },
    start_location: { lat: 29.962302, lng: -90.05020520000001 },
    travel_mode: 'BICYCLING',
  },
  {
    distance: { text: '0.4 mi', value: 666 },
    duration: { text: '2 mins', value: 117 },
    end_location: { lat: 29.961928, lng: -90.04312379999999 },
    html_instructions: 'Turn <b>right</b> onto <b>Chartres St</b>',
    maneuver: 'turn-right',
    polyline: { points: 'of{uDjzrdPr@aFD]BO?CF]?CFc@XqB\\eCr@{ElAaJd@kD' },
    start_location: { lat: 29.9634414, lng: -90.0498179 },
    travel_mode: 'BICYCLING',
  },
  {
    distance: { text: '194 ft', value: 59 },
    duration: { text: '1 min', value: 68 },
    end_location: { lat: 29.9624429, lng: -90.0429645 },
    html_instructions:
      'Turn <b>left</b> onto <b>Piety St</b><div style="font-size:0.9em">Walk your bicycle</div><div style="font-size:0.9em">Destination will be on the right</div>',
    maneuver: 'turn-left',
    polyline: { points: 'a}zuDnpqdPeB_@' },
    start_location: { lat: 29.961928, lng: -90.04312379999999 },
    travel_mode: 'BICYCLING',
  }];

  res.send({
    polyLine, turnByTurn, peterRide,
  });
});

app.get('/userTotals', (req, res) => {
  console.log(req);
  const object = {
    avgSpeed: 20,
    totalDistance: 136,
    costSavings: 200,
    stationaryTime: 800,
    pieChart: [{ Speed: '< 25%', Amount: 20 }, { Speed: '25% - 50%', Amount: 40 }, { Speed: '50% - 75%', Amount: 50 }, { Speed: '> 75%', Amount: 10 }],
  };
  res.send(object);
});

app.get('/login/:token', (req, res) => {
  // () => {
  db.isLoggedIn(req.params.token)
    .then((bool) => {
      console.log(bool);
      res.send({
        bool,
      });
    })
    .catch((error) => {
      console.error(error);
      res.statusCode = 500;
      res.send({
        bool: false,
      });
    });
  // }
});
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  auth({ username }, { password })
    .then((user) => {
      if (user) {
        db.login(user.loginToken)
          .then(() => {
            res.send(user.loginToken);
          });
      } else {
        res.statusCode = 404;
        res.end('User not found');
      }
    });
});
app.post('/logout', (req, res) => {
  const { token } = req.body;
  // auth({ token }, { password })
  // .then((user) => {
  // if (user) {
  db.logout(token)
    .then(() => {
      res.end('User Logged Out');
    });
  // } else {
  // res.statusCode = 404;
  // res.end('User not found');
  // }
  // });
});

app.get('/userStats', (req, res) => {
  console.log(req);
  const recentRides = [{
    avgSpeed: 10,
    totalDistance: 3.5,
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
      db.getUser(userInfo.token)
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
    username,
    password,
  } = req.body;
  auth({ username }, { password })
    .then((user) => {
      if (user) {
        res.statusCode = 400;
        res.end('User exists');
      } else {
        const salt = makeRandom();
        const token = makeRandom();
        const newPassword = sha(password + salt);
        console.log(newPassword);
        db.addUser({
          username,
          newPassword,
          salt,
          token,
        })
          .then(() => {
            res.statusCode = 201;
            res.send(token);
          })
          .catch(() => {
            res.statusCode = 400;
            res.end('User exists');
          });
      }
    });
});
app.patch('/user', (req, res) => {
  const {
    username,
    speed,
    distance,
  } = req.body;

  db.updateUser({
    username,
    speed,
    distance,
  }, res);
});

app.get('/marker', (req, res) => {
  const sampleData = [{ markerLat: 29.969557, markerLon: -90.093964, type: 'pothole' },
    { markerLat: 29.977275, markerLon: -90.076834, type: 'close' },
    { markerLat: 29.976877, markerLon: -90.097837, type: 'avoid' },
    { markerLat: 29.935434, markerLon: -90.081013, type: 'stolen' },
    { markerLat: 29.923302, markerLon: -90.085120, type: 'pothole' },
    { markerLat: 29.924040, markerLon: -90.086611, type: 'crash' },
  ];
  res.send(sampleData);
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
  res.end(); ls;
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
