const express = require('express');
const db = require('../../db/index.js');
const moment = require('moment');

const handleToken = (req, res) => {
  let token = req.query.token;
  let currentVisit = moment();
  let select = `SELECT * FROM User WHERE Token ='${token}'`;
  db.query(select, null, (err, user) => {
    if (err) {
      res.send('error in login query', err);
    } else {
      if (moment(user[0].Last_Visit).isBefore(currentVisit, 'day')) {
        user[0].Gift_Points = user[0].Gift_Points + 1;
      }
      currentVisit = currentVisit.format('YYYY/MM/DD HH:mm:ss');
      let updatePointsDate = `UPDATE User SET 
        Gift_Points = '${user[0].Gift_Points}',
        Last_Visit = '${currentVisit}'
        WHERE Token ='${token}'`
      db.query(updatePointsDate, null, (err, result) => {
        if (err) {
          res.status(404).send(err);
        }
        res.send(user);
      })
    }
  })
}

const checkAuthExists = (username) => {
  let exists = false;
}

const handleAuth = (req, res) => {
  let token = req.body.token;
  let name = req.body.name;
  let username = req.body.username;
  let empty = undefined;
  let currentVisit = moment();

  let select = `SELECT * FROM User WHERE username ='${username}'`;
  let checkForExistingUser = `UPDATE User SET Token = '${token}' WHERE Username = '${username}'`;
  let authQuery = `INSERT INTO User (ID, Name, Username, Email, Hash_Password, Token, Photo_Url, Gift_Points) VALUES (NULL, '${name}', '${username}', '${empty}', '${empty}', '${token}', '${empty}', 5)`;

  db.query(select, null, (err, user) => {
    if (err) {
      res.send('error in checkAuthExists', err);
    } else {
      if (!!user[0]) { //if user already exists
        // UPDATE MyGuests SET lastname='Doe' WHERE id=2
        db.query(checkForExistingUser, (err, results) => {
          if (err) {
            res.send('error in updating existing auth-er', err);
          } else {
            if (moment(user[0].Last_Visit).isBefore(currentVisit, 'day')) {
              user[0].Gift_Points = user[0].Gift_Points + 1;
            }
            currentVisit = currentVisit.format('YYYY/MM/DD HH:mm:ss');
            let updatePointsDate = `UPDATE User SET 
              Gift_Points = '${user[0].Gift_Points}',
              Last_Visit = '${currentVisit}'
              WHERE Token ='${token}'`
            db.query(updatePointsDate, null, (err, result) => {
              if (err) {
                res.status(404).send(err);
              }
              res.status(200).send({
                user: user[0].ID,
                giftPoints: user[0].Gift_Points
              });
            })
          }
        })
      } else { //if user doesn't exist
        db.query(authQuery, (err, results) => {
          if (err) {
            res.send('error in inserting Auth query', err);
          } else {
            db.query(select, null, (err, user) => {
              if (err) {
                res.send('error in retrieving newly inputted ID')
              } else {
                res.status(200).send({
                  user: user[0].ID,
                  giftPoints: user[0].Gift_Points
                });
              }
            })
          }
        })
      }
    }
  })
}


module.exports = {
  handleToken,
  handleAuth
}
