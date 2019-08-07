const Sequelize = require('sequelize');

//! Run in mysql shell before running
//! CREATE DATABASE IF NOT EXISTS chainring;
//! use chainring;

const sequelize = new Sequelize('chainring', 'root', '', {
  dialect: 'mysql'
});

const User = sequelize.define('user', {
  name: {
    type: sequelize.STRING
  },
  avgSpeed: {
    type: Sequelize.STRING
  },
  totalDistance: {
    type: Sequelize.NUMBER
  }
});

const Ride = sequelize.define('user', {
  userId : {
    type: Sequelize.NUMBER,
    references: 'users',
    referencesKey: 'id'
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

const Route = sequelize.define('user', {
  userId: {
    type: Sequelize.NUMBER,
    references: 'users',
    referencesKey: 'id'
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

const Marker = sequelize.define('user', {
  userId: {
    type: Sequelize.NUMBER,
    references: 'users',
    referencesKey: 'id'
  },
  rideId : {
    type: Sequelize.NUMBER,
    references: 'rides',
    referencesKey: 'id'
  },
  routeId : {
    type: Sequelize.NUMBER,
    references: 'routes',
    referencesKey: 'id'
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

const Location = sequelize.define('user', {
  userId: {
    type: Sequelize.NUMBER,
    references: 'users',
    referencesKey: 'id'
  },
  rideId: {
    type: Sequelize.NUMBER,
    references: 'rides',
    referencesKey: 'id'
  },
  lat : {
    type : Sequelize.STRING,
  },
  lon : {
    type: Sequelize.STRING,
  },
});

const Stat = sequelize.define('user', {
  userId: {
    type: Sequelize.NUMBER,
    references: 'users',
    referencesKey: 'id'
  },
  rideId: {
    type: Sequelize.NUMBER,
    references: 'rides',
    referencesKey: 'id'
  },
  avgSpeed: {
    type: Sequelize.NUMBER,
  },
  calBurned: {
    type: Sequelize.NUMBER,
  },
  costSavings: {
    type: Sequelize.NUMBER,
  },
  stationaryTime: {
    type: Sequelize.NUMBER,
  },
});


module.exports = {
  User = sequelize.define('User', User, { tableName: 'users', timestamps: true }),
  Marker = sequelize.define('Marker', Marker, {tableName: 'markers', timestamps: true}),
  Location = sequelize.define('Location', Location, { tableName: 'locations', timestamps: true }),
  Stat = sequelize.define('Stat', Stat, { tableName: 'stats', timestamps: true }),
  Route = sequelize.define('Route', Route, { tableName: 'routes', timestamps: true }),
  Ride = sequelize.define('Ride', Ride, { tableName: 'rides', timestamps: true }),
}