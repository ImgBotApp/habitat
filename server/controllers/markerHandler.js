const express = require('express');
const db = require('../../db/index.js');

const handleMarkers = (req, res) => {
  let User_ID = req.query.userID;
  console.log('userID in handleMarkers', user_ID)
  let selectMarkers = `SELECT * FROM Marker WHERE User_ID = ${User_ID}`;
  db.query(selectMarkers, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error looking up the locations ${err}`);
    } else {
      res.status(201).send(results);
    }
  })
}

module.exports = handleMarkers;
