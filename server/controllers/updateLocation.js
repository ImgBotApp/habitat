const express = require('express');
const db = require('../../db/index.js');

const updateLocation = (req, res) => {
  let id = req.body.userID;
  let lat = req.body.location.coords.latitude;
  let lng = req.body.location.coords.longitude;

  let update = `UPDATE User SET Latitude = ${lat}, Longitude=${lng} WHERE ID ='${id}'`;

  db.query(update, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error deleting the task: ${err}`);
    } else {
      res.status(200).send(results);
    }
  })
}

module.exports = updateLocation;
