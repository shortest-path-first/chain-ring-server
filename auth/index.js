const sha = require('sha1');
const db = require('../db/db');

const verify = ({ username, token }, tryUser) => {
  let found = false;
  let foundUser = null;
  if (token) {
    return db.getUser({ token })
      .then((users) => {
        users.forEach((user) => {
          if (user.password === sha(tryUser.password + user.salt) && found !== true) {
            found = true;
            foundUser = user;
          }
        });
        return foundUser;
      });
  }
  return db.getUser({ username })
    .then((users) => {
      users.forEach((user) => {
        if (user.password === sha(tryUser.password + user.salt) && found !== true) {
          found = true;
          foundUser = user;
        }
      });
      return foundUser;
    });
};

module.exports = verify;
