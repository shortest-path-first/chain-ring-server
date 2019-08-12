const Sequelize = require('sequelize');

//! Run in mysql shell before running
//! CREATE DATABASE IF NOT EXISTS chainring;
//! use chainring;

const sequelize = new Sequelize('chainring', 'root', '', {
  dialect: 'mysql',
});

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  avgSpeed: {
    type: Sequelize.FLOAT(11),
  },
  avgSpeedCount: {
    type: Sequelize.INTEGER,
  },
  totalDistance: {
    type: Sequelize.FLOAT(11),
  },
  totalSavings: {
    type: Sequelize.FLOAT(11),
  },
},
{
  timestamps: false,
});

const Ride = sequelize.define('ride', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  lineString: {
    type: Sequelize.STRING, // Checkout Range
  },
  routeTime: {
    type: Sequelize.STRING,
  },
  startLat: {
    type: Sequelize.FLOAT(11),
  },
  startLon: {
    type: Sequelize.FLOAT(11),
  },
  endLat: {
    type: Sequelize.FLOAT(11),
  },
  endLon: {
    type: Sequelize.FLOAT(11),
  },
},
{
  timestamps: false,
});

const Route = sequelize.define('route', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  lineString: {
    type: Sequelize.STRING, // Checkout Range
  },
  routeTime: {
    type: Sequelize.STRING,
  },
  startLat: {
    type: Sequelize.FLOAT(11),
  },
  startLon: {
    type: Sequelize.FLOAT(11),
  },
  endLat: {
    type: Sequelize.FLOAT(11),
  },
  endLon: {
    type: Sequelize.FLOAT(11),
  },
},
{
  timestamps: false,
});

const Marker = sequelize.define('marker', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  rideId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'rides',
      key: 'id',
    },
  },
  routeId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'routes',
      key: 'id',
    },
  },
  markerLat: {
    type: Sequelize.FLOAT(11),
  },
  markerLon: {
    type: Sequelize.FLOAT(11),
  },
  iconImage: {
    type: Sequelize.STRING,
  },

  type: {
    type: Sequelize.STRING,
  },
},
{
  timestamps: false,
});

const Location = sequelize.define('location', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  rideId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'rides',
      key: 'id',
    },
  },
  lat: {
    type: Sequelize.FLOAT(11),
  },
  lon: {
    type: Sequelize.FLOAT(11),
  },
},
{
  timestamps: false,
});

const Stat = sequelize.define('stat', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  rideId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'rides',
      key: 'id',
    },
  },
  routeTime: {
    type: Sequelize.FLOAT(11),
  },
  avgSpeed: {
    type: Sequelize.FLOAT(11),
  },
  totalDistance: {
    type: Sequelize.FLOAT(11),
  },
  costSavings: {
    type: Sequelize.FLOAT(11),
  },
  stationaryTime: {
    type: Sequelize.INTEGER,
  },
},
{
  timestamps: false,
});

User.sync();
Route.sync();
Ride.sync();
Marker.sync();
Location.sync();
Stat.sync();

module.exports = {
  User,
  Marker,
  Location,
  Stat,
  Route,
  Ride,
};
