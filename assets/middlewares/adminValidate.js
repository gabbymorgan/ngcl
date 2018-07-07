const User = require('../../data/users/UserModel');

//find user and set username to req property user
const adminValidate = function(req, res, next) {
    if (req.session && req.session.username) {
      const username = req.session.username;
      return User
        .findOne({ username: username })
        .then(user => {
            if (user.username == "wrpelton") {
                req.user = user;
                next();
            }
        }).catch(err => {
            next();
        });
    } else {
      next();
    } 
  };

  module.exports = adminValidate;