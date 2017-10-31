const express = require('express');
const db = require('../../db/index.js');

const handleNewLocation = (req, res) => {
  let user = req.body.user_ID;
  let title = req.body.title;
  let description = req.body.description;
  let avatar = req.body.avatar;
  let lng = req.body.longitude;
  let lat = req.body.latitude;
  let eco = req.body.eco;
  let query = `INSERT INTO Marker (Marker_ID, Marker_Title, Marker_Description, Ecosystem, Avatar, Latitude, Longitude, Radius, User_ID) VALUES (NULL, '${title}', '${description}', '${eco}','${avatar}', '${lat}', '${lng}', ${50}, '${user}')`;
  
  db.query(query, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error creating the category ${err}`);
    } else {
      res.status(201).send(results);
    }
  })
}

module.exports = handleNewLocation;
