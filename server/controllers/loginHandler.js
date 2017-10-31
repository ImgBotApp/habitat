const express = require('express');
const db = require('../../db/index.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jwt-simple')
const moment = require('moment');

const handleLogin = (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  let select = `SELECT * FROM User WHERE Username ='${username}'`;

  db.query(select, null, (err, users) => {
    if (err) {
      res.send('error in login query', err);
    } else {
      if (users[0]) {
        bcrypt.compare(password, users[0].Hash_Password, function(err, result) {
          if (result === true) {
            delete users[0].Hash_Password;
            var expires = moment().add('days', 30).valueOf();
            var token = jwt.encode({
              iss: username,
              exp: expires
            }, req.app.get('jwtTokenSecret'));

            // query updates user row with token async maybe
            let checkForExistingUser = `UPDATE User SET Token = '${token}' WHERE Username = '${username}'`;
            db.query(checkForExistingUser, (err, updated) => {
              if (err) {
                res.send('error in updating existing user', err);
              } else {
                res.json({
                  token: token,
                  user: users[0].ID
                })
              }
            })
          } else {
            res.send('error in bcrypcompare');
          }
        })
      }
    }
  })
}

module.exports = handleLogin;
