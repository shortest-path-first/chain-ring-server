const Sequelize = require('sequelize');

//! Run in mysql shell before running
//! CREATE DATABASE IF NOT EXISTS chainring;
//! use chainring;

const sequelize = new Sequelize('chainring', 'root', '', {
  dialect: 'mysql'
});

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING
  },
  avgSpeed: {
    type: Sequelize.STRING
  },
  totalDistance: {
    type: Sequelize.INTEGER
  }
});

const Ride = sequelize.define('ride', {
  userId : {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
  },
  lineString : {
    type: Sequelize.STRING, //Checkout Range
  },
  routeTime : {
    type: Sequelize.STRING,
  },
  startLat : {
    type: Sequelize.STRING,
  },
  startLon : {
    type: Sequelize.STRING,
  },
  endLat : {
    type: Sequelize.STRING,
  },
  endLon : {
    type: Sequelize.STRING,
  },
});

const Route = sequelize.define('route', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
  },
  lineString: {
    type: Sequelize.STRING, //Checkout Range
  },
  routeTime: {
    type: Sequelize.STRING,
  },
  startLat: {
    type: Sequelize.STRING,
  },
  startLon: {
    type: Sequelize.STRING,
  },
  endLat: {
    type: Sequelize.STRING,
  },
  endLon: {
    type: Sequelize.STRING,
  },
});

const Marker = sequelize.define('marker', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
  },
  rideId : {
    type: Sequelize.INTEGER,
    references: {
      model: 'rides',
      key: 'id'
    },
  },
  routeId : {
    type: Sequelize.INTEGER,
    references: {
      model: 'routes',
      key: 'id'
    },
  },
  markerLat : {
    type : Sequelize.STRING,
  },
  markerLon : {
    type : Sequelize.STRING,
  },
  iconImage : {
    type : Sequelize.STRING,
  },

  type: {
    type: Sequelize.STRING
  }
});

const Location = sequelize.define('location', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
  },
  rideId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'rides',
      key: 'id'
    },
  },
  lat : {
    type : Sequelize.STRING,
  },
  lon : {
    type: Sequelize.STRING,
  },
});

const Stat = sequelize.define('stat', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
  },
  rideId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'rides',
      key: 'id'
    },
  },
  avgSpeed: {
    type: Sequelize.INTEGER,
  },
  calBurned: {
    type: Sequelize.INTEGER,
  },
  costSavings: {
    type: Sequelize.INTEGER,
  },
  stationaryTime: {
    type: Sequelize.INTEGER,
  },
});

User.sync();
Marker.sync();
Location.sync();
Stat.sync();
Route.sync();
Ride.sync();

module.exports = {
  User,
  Marker,
  Location,
  Stat,
  Route,
  Ride,
}