const express = require('express');
const db = require('../../db/index.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jwt-simple')
const moment = require('moment');

const handleSignup = (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  let select = `SELECT ID FROM User WHERE Username = '${username}'`;
  db.query(select, null, (err, results) => {
    if (err) {
      res.status(404).send(`Encountered error during post ${err}`);
    } else {
      if (results.length > 0) {
        res.status(404).send(`Username already exists.`);
      } else {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            var expires = moment().add('days', 30).valueOf();
            var token = jwt.encode({
              iss: username,
              exp: expires
            }, req.app.get('jwtTokenSecret'));
            let insert = `INSERT INTO User (ID, Name, Username, Email, Hash_Password, Token, Photo_Url) VALUES (NULL, '${undefined}', '${username}', '${email}', '${hash}', '${token}', NULL)`
            db.query(insert, (err, user) => {
              if (err) {
                res.status(404).send(`Encountered error during post ${err}`)
              } else {
                db.query(select, null, (err, wantedUser) => {
                  if (err) {
                    res.status(404).send(`Encountered error during post ${err}`);
                  } else {
                    db.query(`INSERT INTO TimerEcosystem (User_ID) VALUES (${wantedUser[0].ID})`, null, (err, user) => {
                      if (err) {
                        res.status(404).send('timerecosystem not created', err)
                      } else {
                        res.send({
                          userID: wantedUser[0].ID,
                          token: token
                        });
                      }
                    })
                  }
                })
              }
            })
          })
        })
      }
    }
  })
}

module.exports = handleSignup;
