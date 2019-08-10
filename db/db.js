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

const addUser = username => User.build({
  name: username,
  avgSpeedCount: 0,
}).save();

const getUser = username => User.findAll({
  where: {
    name: username,
  },
});

const updateUser = ({
  name,
  speed,
  distance,
}, res) => {
  if (speed !== undefined) {
    User.findAll({
      where: {
        name,
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
        name,
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
};

const addRide = () => {
  Ride.build({}).save();
};

const addRoute = () => {
  Route.build({}).save();
};

const addStat = ({
  username,
}) => User.findAll({
  where: {
    name: username,
  }
    .then((users) => {
      console.log(users);
      return {
        user: users[0],
      };
    })
    .then(({
      user,
    }) => Stat.findAll({
      where: {
        userId: user.id,
        // rideId: ,
      },
    })),
  // Stat.build({
  //   userId: ,
  //   rideId: ,
  //   avgSpeed: ,
  //   calBurned: ,
  //   costSavings: ,
  //   stationaryTime: ,
  // }).save();
});

module.exports = {
  addLocation,
  addMarker,
  addRide,
  addRoute,
  addStat,
  addUser,
  updateUser,
  getUser,
};
