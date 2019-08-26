
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
const turf = require('@turf/turf');

const express = require('express');
const axios = require('axios');
const polyline = require('google-polyline');
const sha = require('sha1');
const PathFinder = require('geojson-path-finder');
const { point } = require('@turf/helpers');

const geojsonPick = require('geojson-pick');
const geojson = require('./db/Bike_Lanes.json');

const newGeoJson = geojsonPick.pickProperties(geojson, { type: 'Feature', properties: { type: 'LineString' } });
const pathPoints = turf.explode(geojson);
const testCoords = polyline.decode('m~}uD~yxdPf@w@p@iAT_@T_@dAcBl@aAl@_AN[h@aA`A_Bx@qARYt@oAp@gA|@uAbAaBr@kAnAuBf@y@Ze@TWV[@CNWLQBGLUp@kA`AaBzBmDvBmDtBoDhB}CJM?A@A@AFK@AFI?ALQz@yAT_@T_@p@cA`@m@Xc@jBaDXc@hAoB|AcCT_@j@_A^k@p@gANWd@u@vA_CJUNU|AgC');
const geoParse = [];
testCoords.forEach((coord) => {
  geoParse.push(coord.reverse());
});
const testCoordsPath = turf.points(geoParse);

pathPoints.features.concat(testCoordsPath.features);
const lineStrings = [];

for (let i = 0; i < newGeoJson.features.length; i++) {
  newGeoJson.features[i].geometry.coordinates.forEach((line) => {
    if (typeof line[0] === 'number') {
      lineStrings.push(line.reverse());
    }
  });
}

const actualLineStrings = turf.lineString(lineStrings);

const pathFinder = new PathFinder(geojson, { precision: 1e-3 });
const db = require('./db/db');
const auth = require('./auth/index');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const usedTokens = [];
const makeRandom = () => {
  // Makes randomized string of characters
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
  // sends back Headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});


app.get('/mapSearch', (req, res) => {
  const {
    place, userLoc,
  } = req.query;
  // Sends Request to google's map api and get route/polyLine point
  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLoc}&radius=8000&keyword=${place}&key=AIzaSyAm0rv3w8tQUIPbjDkQyGhQUsK5rAxfBUs`)
    .then((response) => {
      const filteredResults = response.data.results.map(obj => [obj.geometry.location, obj.name, obj.vicinity]);
      res.send(filteredResults);
    })
    .catch((err) => {
      console.error(err);
      res.statusCode = 500;
      res.end('Somehting went wrong');
    });
});

app.get('/mapPolyline', (req, res) => {
  // need to pass in location dynamically
  const { place, userLoc, wayPoint } = req.query;
  let commaIndex = userLoc.indexOf(',');
  const startLat = userLoc.slice(0, commaIndex);
  const startLng = userLoc.slice(commaIndex + 1);
  commaIndex = place.indexOf(',');
  const endLat = place.slice(0, commaIndex);
  const endLng = place.slice(commaIndex + 1);
  const start = turf.point([Number(startLng), Number(startLat)].reverse());
  const end = turf.point([Number(endLng), Number(endLat)].reverse());
  const startInNetwork = turf.nearest(start, pathPoints);
  const endInNetwork = turf.nearest(end, pathPoints);


  const safePath = pathFinder.findPath(startInNetwork, endInNetwork);
  if (!wayPoint) {
    let safePolyline;
    axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${userLoc}&destination=${place}&key=AIzaSyAm0rv3w8tQUIPbjDkQyGhQUsK5rAxfBUs&mode=bicycling`)
      .then((response) => {
        const wayPointArr = [];
        const polyLine = response.data.routes[0].overview_polyline.points;
        const turnByTurn = response.data.routes[0].legs[0].steps.map(step => [`${step.html_instructions.replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/<div style="font-size:0.9em">/g, ' ').replace(/<\/div>/g, '')}`, `for ${step.distance.text}/${step.duration.text}`]);
        const peterRide = response.data.routes[0].legs[0].steps;
        if (safePath !== null) {
          const length = safePath.path.length - 2;
          const divider = Math.floor(length / 8);
          let waypointStr = '';
          for (let i = 1; i <= 8; i++) {
            waypointStr += `${safePath.path[i * divider]}|`;
          }
          const waypointCall = `${safePath.path[0]}|${waypointStr}${safePath.path[safePath.path.length - 1]}`;
          axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${userLoc}&destination=${place}&key=AIzaSyAm0rv3w8tQUIPbjDkQyGhQUsK5rAxfBUs&mode=bicycling&waypoints=${waypointCall}`)
            .then((safeResponse) => {
              safePolyline = safeResponse.data.routes[0].overview_polyline.points;
              const safeTurnByTurn = [];
              const safeRide = [];
              safeResponse.data.routes[0].legs.forEach((leg) => {
                const instruction = leg.steps.map(step => [`${step.html_instructions.replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/<div style="font-size:0.9em">/g, ' ').replace(/<\/div>/g, '')}`, `for ${step.distance.text}/${step.duration.text}`]);
                safeTurnByTurn.push(instruction);
                safeRide.push(leg.steps);
              });

              res.send({
                polyLine, turnByTurn, peterRide, safePath, wayPointArr, safePolyline, safeTurnByTurn, safeRide,
              });
            }).catch((safeErr) => {
              console.error('waypoint', safeErr);
            });
        }
      })
      .catch((err) => {
        console.error(err);
        res.statusCode = 500;
        res.end('Somehting went wrong');
      });
  } else if (wayPoint) {
    // const path = pathFinder.findPath(userLoc, place);
    // axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${userLoc}&destination=${place}&key=AIzaSyAm0rv3w8tQUIPbjDkQyGhQUsK5rAxfBUs&mode=bicycling&waypoints=[${wayPoint}]`)
    //   .then((response) => {
    //     console.log(response.data);
    //   });
  }
});

app.get('/userTotals', (req, res) => {
  db.getUser(req.query)
    .then((users) => {
      res.send(users[0]);
    })
    .catch((err) => {
      console.error(err);
      res.statusCode = 500;
      res.end('Somehting went wrong');
    });
});

app.get('/login/:token', (req, res) => {
  // () => {
  db.isLoggedIn(req.params.token)
    .then((bool) => {
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
    })
    .catch((err) => {
      console.error(err);
      res.statusCode = 500;
      res.end('Somehting went wrong');
    });
});
app.post('/logout', (req, res) => {
  const { token } = req.body;
  db.logout(token)
    .then(() => {
      res.end('User Logged Out');
    })
    .catch((err) => {
      console.error(err);
      res.statusCode = 500;
      res.end('Somehting went wrong');
    });
});

app.get('/userStats', (req, res) => {
  // Used to get user last 5 rides from user
  // Provided to stats page
  db.getRides({ token: req.query.token })
    .then((rides) => {
      res.send(rides.slice(rides.length - 5));
    })
    .catch((err) => {
      console.error(err);
      res.statusCode = 500;
      res.end('Somehting went wrong');
    });
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
          console.error(err);
          res.statusCode = (500);
          res.end('Something Went Wrong');
        });
    });
});
app.post('/userInfo', (req, res) => {
  /**
   * Accepts Username and password in body
   */
  const {
    username,
    password,
  } = req.body;
  let token;
  auth({ username }, { password })
    .then((user) => {
      if (user) {
        res.statusCode = 400;
        res.end('User exists');
      } else {
        const salt = makeRandom();
        token = makeRandom();
        // Hashes password + salt
        const newPassword = sha(password + salt);
        return db.addUser({
          username,
          newPassword,
          salt,
          token,
        });
      }
    })
    .then(() => {
      res.statusCode = 201;
      res.send(token);
    })
    .catch(() => {
      res.statusCode = 400;
      res.end('User exists');
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

app.post('/marker', (req, res) => {
  const { markers } = req.body;
  db.addMarker(markers)
    .then(() => {
      res.statusCode = 201;
      res.end('Rides Saved');
    })
    .catch((err) => {
      console.error(err);
      res.statusCode = 500;
      res.end('Somehting went wrong');
    });
});

app.get('/location', (req, res) => {
  db.getLocations(req.query)
    .then((locations) => {
      res.send(locations);
    })
    .catch((err) => {
      console.error(err);
      res.statusCode = 500;
      res.end('Somehting went wrong');
    });
});
app.post('/location', (req, res) => {
  db.addLocation(req.query)
    .then(() => {
      res.statusCode = 201;
      res.end('Location saved');
    })
    .catch((err) => {
      console.error(err);
      res.statusCode = 500;
      res.end('Somehting went wrong');
    });
});

app.post('/ride', (req, res) => {
  db.addRide(Object.create(req.query))
    .then(() => {
      res.end('Ride saved');
    })
    .catch((err) => {
      console.error(err);
      res.statusCode = 500;
      res.end('Somehting went wrong');
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
