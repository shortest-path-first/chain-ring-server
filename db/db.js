const {Marker, Location, User, Ride, Route, Stat} = require('./index');

console.log(models.User);

const addMarker = () => {
  Marker.build({}).save()
};

const addLocation = () => {
  Location.build({}).save()
};

const addUser = () => {
  User.build({}).save()
};

const addRide = () => {
  Ride.build({}).save()
};

const addRoute = () => {
  Route.build({}).save()
};

const addStat = () => {
  Stat.build({}).save()
};

module.exports = {
  addLocation,
  addMarker,
  addRide,
  addRoute,
  addStat,
  addUser,
}