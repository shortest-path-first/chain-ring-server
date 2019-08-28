const {
  Marker,
  Location,
  User,
  Ride,
  Route,
  Stat,
} = require('./index');

console.log(User);

const addMarker = markers => Marker.bulkCreate(markers);

const addLocation = ({
  token,
  lat,
  lng,
  loc,
}) => User.findAll({
  where: {
    loginToken: token,
  },
})
  .then((users) => {
    const user = users[0];
    return Location.build({
      userId: user.id,
      lat,
      lon: lng,
      name: loc,
    }).save();
  });

const getLocations = ({ token }) => User.findAll({
  where: {
    loginToken: token,
  },
})
  .then((users) => {
    const user = users[0];
    return Location.findAll({
      where: {
        userId: user.id,
      },
    });
  });

const isLoggedIn = token => User.findAll({
  where: {
    loginToken: token,
  },
})
  .then((users) => {
    console.log(users[0].loginStatus);
    return users[0].loginStatus;
  })
  .catch((err) => {
    console.error(err);
    return false;
  });

const login = token => User.findAll({
  where: {
    loginToken: token,
  },
})
  .then((users) => {
    const user = users[0];
    if (user.loginStatus === false) {
      user.update({
        loginStatus: true,
      });
    }
    console.log(user);
  });

const logout = token => User.findAll({
  where: {
    loginToken: token,
  },
})
  .then((users) => {
    const user = users[0];
    if (user.loginStatus === true) {
      user.update({
        loginStatus: false,
      });
    }
  });


const addUser = ({
  username,
  newPassword,
  salt,
  token,
}) => User.build({
  name: username,
  password: newPassword,
  salt,
  avgSpeedCount: 0,
  loginStatus: true,
  loginToken: token,
}).save();

const getUser = ({ token, username }) => {
  if (token) {
    return User.findAll({
      where: {
        loginToken: token,
      },
    });
  }
  return User.findAll({
    where: {
      name: username,
    },
  });
};

const updateUser = ({
  token,
  speed,
  distance,
  duration,
  // stationaryTime
}, res) => {
  if (speed !== undefined) {
    User.findAll({
      where: {
        loginToken: token,
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
        loginToken: token,
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
  if (duration !== undefined) {
    User.findAll({
      where: {
        loginToken: token,
      },
    })
      .then((users) => {
        const user = users[0];
        let totalTime = 0;
        if (user) {
          if (user.totalDuration !== 'null') {
            totalTime = user.totalDuration;
          }
          user.update({
            totalDuration: totalTime + Math.floor(duration),
          });
        }
      })
      .then(() => {
        res.end('Savings updated');
      });
  }
};

const addRide = ({
  average,
  duration,
  polyLine,
  topSpeed,
  totalDistance,
  token,
  breakdown,
  rideTime,
}) => User.findAll({
  where: {
    loginToken: token,
  },
})
  .then((users) => {
    console.log(rideTime);
    const user = users[0];
    let newSpeed;
    if (typeof Number(topSpeed) !== 'number' || topSpeed === 'null') {
      newSpeed = 0;
    } else {
      newSpeed = Number(topSpeed);
    }
    let newDistance;
    if (typeof Number(totalDistance) !== 'number' || totalDistance === 'null') {
      newDistance = 0;
    } else {
      newDistance = Number(totalDistance);
    }
    let newAverage;
    if (typeof Number(average) !== 'number' || average === 'null') {
      newAverage = 0;
    } else {
      newAverage = Number(average);
    }

    Ride.build({
      userId: user.id,
      polyLine,
      duration: Math.floor(duration),
      avgSpeed: newAverage,
      topSpeed: newSpeed,
      totalDistance: newDistance,
      breakdown,
      rideTime,
    }).save();
    return {
      user,
      avg: newAverage,
      newDistance,
    };
  })
  .then(({ user, avg, newDistance }) => {
    // const newAverage = ((user.avgSpeed * user.avgSpeedCount) + avg) / (user.avgSpeedCount + 1);
    console.log(user, avg, newDistance);
    updateUser({
      token: user.loginToken, speed: avg, distance: newDistance, duration 
    });
  });
const getRides = ({ token }) => User.findAll({
  where: {
    loginToken: token,
  },
})
  .then((users) => {
    const user = users[0];
    return Ride.findAll({
      where: {
        userId: user.id,
      },
    });
  });

const addRoute = () => {
  Route.build({}).save();
};

const addStat = () => {

};

const getStat = token => User.findAll({
  where: {
    loginToken: token,
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
  getLocations,
  addMarker,
  addRide,
  addRoute,
  addStat,
  getStat,
  addUser,
  updateUser,
  getUser,
  getRides,
  isLoggedIn,
  login,
  logout,
};
