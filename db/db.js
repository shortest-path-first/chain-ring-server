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
  savings,
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
  if (savings !== undefined) {
    User.findAll({
      where: {
        loginToken: token,
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

const addRide = ({
  average,
  duration,
  polyLine,
  topSpeed,
  totalDistance,
  token,
  breakdown,
}) => {
  User.findAll({
    where: {
      loginToken: token,
    },
  })
    .then((users) => {
      const user = users[0];

      Ride.build({
        userId: user.id,
        polyLine,
        routeTime: duration,
        avgSpeed: average,
        topSpeed,
        totalDistance,
        breakdown,
      });
    }).save();
};

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
  addMarker,
  addRide,
  addRoute,
  addStat,
  getStat,
  addUser,
  updateUser,
  getUser,
  isLoggedIn,
  login,
  logout,
};
