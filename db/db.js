const polyline = require('google-polyline');
const axios = require('axios');
const {
  distanceTime,
} = require('../data');
const {
  Marker,
  Location,
  User,
  Ride,
  Route,
  Stat,
} = require('./index');

console.log(User);

const addMarker = (markers) => {

  Marker.bulkCreate(markers);
};

const addLocation = () => {
  Location.build({}).save();
};

const addUser = ({ googleId }) => User.build({
  googleId,
  avgSpeedCount: 0,
}).save();

const getUser = ({ googleId }) => User.findAll({
  where: {
    googleId,
  },
});

const updateUser = ({
  googleId,
  speed,
  distance,
  savings,
  // stationaryTime
}, res) => {
  if (speed !== undefined) {
    User.findAll({
      where: {
        googleId,
      },
    })
      .then((users) => {
        const user = users[0];
        if (user) {
          const {
            avgSpeedCount,
          } = user;
          const avgSpeed = (user.avgSpeed * avgSpeedCount + speed) / (avgSpeedCount + 1);
          user.update({
            avgSpeed,
            avgSpeedCount: user.avgSpeedCount + 1,
          });
        }
      })
      .then(() => {
        res.end('Speed updated');
      });
  }
  if (distance !== undefined) {
    User.findAll({
      where: {
        googleId,
      },
    })
      .then((users) => {
        const user = users[0];
        if (user) {
          user.update({
            totalDistance: user.totalDistance + distance,
          });
        }
      })
      .then(() => {
        res.end('Distance updated');
      });
  }
  if (savings !== undefined) {
    User.findAll({
      where: {
        googleId,
      },
    })
      .then((users) => {
        const user = users[0];
        if (user) {
          user.update({
            totalSavings: user.totalSavings + savings,
          });
        }
      })
      .then(() => {
        res.end('Savings updated');
      });
  }
};

const addRide = ({ googleId, lineString, routeTime }, coords, res) => {
  User.findAll({
    where: {
      googleId,
    },
  }).then((users) => {
    const user = users[0];
    Ride.build({
      userId: user.id,
      lineString,
      routeTime,
      startLat: coords[0][0],
      startLon: coords[0][1],
      endLat: coords[coords.length - 1][0],
      endLon: coords[coords.length - 1][1],
    }).save();
  });
  addStat({ lineString, googleId }, res);
};

const addRoute = () => {
  Route.build({}).save();
};

const addStat = ({
  googleId,
  lineString,
}, res) => User.findAll({
  where: {
    googleId,
  },
}).then((users) => {
  console.log(users);
  return {
    user: users[0],
  };
})
  .then(({
    user,
  }) => Ride.findAll({
    where: {
      userId: user.id,
      lineString,
    },
  })
    .then((rides) => {
      console.log('rides', user);
      return { ride: rides[0], user };
    }))
  .then(({ ride, user }) => {
    // axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=29.97341,-90.05237&destinations=enc:${lineString}:&key=${process.env.GOOGLE_KEY}&mode=bicycling`)
    //   .then((rideInfo) => {
    //     rideInfo
    //     let {
    //       distance,
    //       duration
    //     } = rideInfo.rows[rideInfo.rows.length - 1]
    //       .elements[rideInfo.rows[rideInfo.rows.length - 1].elements.length - 1];
    //     distance = Number(distance.text.match(/[1-9,.]/g).join(''));
    //     duration = Number(duration.text.match(/[1-9]/g).join(''));
    //     console.log(duration);
    //     const avgSpeed = (distance) * (60 / duration);
    //     const savings = distance * 2.660;
    //     Stat.build({
    //       userId: user.id,
    //       rideId: ride.id,
    //       avgSpeed,
    //       costSavings: savings,
    //       // stationaryTime: ,
    //     }).save();
    //     updateUser({
    //       name: user.name,
    //       distance,
    //       speed: avgSpeed,
    //       savings,
    //     }, res);
    //   });

    let { distance, duration } = distanceTime.rows[distanceTime.rows.length - 1]
      .elements[distanceTime.rows[distanceTime.rows.length - 1].elements.length - 1];
    distance = Number(distance.text.match(/[1-9,.]/g).join(''));
    duration = Number(duration.text.match(/[1-9]/g).join(''));
    console.log(duration);
    const avgSpeed = (distance) * (60 / duration);
    const savings = distance * 2.660;
    Stat.build({
      userId: user.id,
      rideId: ride.id,
      avgSpeed,
      costSavings: savings,
      // stationaryTime: ,
    }).save();
    updateUser({
      id: user.id,
      distance,
      speed: avgSpeed,
      savings,
    }, res);
  });

const getStat = googleId => User.findAll({
  where: {
    googleId,
  },
})
  .then((users) => {
    const user = users[0];
    return Stat.findAll({
      where: {
        userId: user.id,
      },
    });
  })
  .then(
    stats => stats.slice(0, 6),
  );

module.exports = {
  addLocation,
  addMarker,
  addRide,
  addRoute,
  addStat,
  getStat,
  addUser,
  updateUser,
  getUser,
};
