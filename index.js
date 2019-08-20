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

const usedTokens = [];

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
  //     const turnByTurn = response.routes[0].legs[0].steps.map((step) => {
  //     return [`${step.html_instructions.replace(/<b>/g, "").replace(/<\/b>/g, "").replace(/<div style="font-size:0.9em">/g, ' ').replace(/<\/div>/g, '')}`, `for ${step.distance.text}/${step.duration.text}`];  //     });
  //     res.send({ polyLine, turnByTurn });
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

app.get('/login/:token', (req, res) => {
  setTimeout(() => {
    db.isLoggedIn(req.params.token)
      .then((bool) => {
        console.log(bool);
        res.send({
          bool,
        });
      })
      .catch((error) => {
        res.statusCode = 500;
        res.send({
          bool: false,
        });
      });
  }, 400);
});
app.patch('/login/:token', (req, res) => {
  db.login(req.body.token)
    .then(() => {
      res.send('User Logged In');
    });
});
app.patch('/logout/:token', (req, res) => {
  db.logout(req.params.token)
    .then(() => {
      res.send('User Logged Out');
    });
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
      db.getUser({
        googleId: userInfo.sub,
      })
        .then((users) => {
          if (users[0] === undefined) {
            const makeId = () => {
              let result = '';
              const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
              const charactersLength = characters.length;
              const length = Math.random() * (250 - 150) + 150;
              for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
              }
              if (usedTokens.includes(result)) {
                return makeId();
              }
              return result;
            };
            const token = makeId();
            db.addUser({
              googleId: userInfo.sub,
              token,
            })
              .then(() => {
                res.statusCode = 201;
                res.send({ token });
              });
            console.log(userInfo);
          } else {
            const {
              loginToken,
            } = users[0];

            res.send({
              loginToken,
            });
          }
        });
    })
    .catch((err) => {
      console.error(err);
      res.statusCode = 500;
      res.end('Something went Wrong');
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
