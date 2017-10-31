const express = require('express');
const db = require('../../db/index.js');

const friendLocations = (req, res) => {
  let user = req.query.user;

  let query = `
    SELECT f.Friend,
    f.Friend_Name,
    f.Pic,
    u.Latitude,
    u.Longitude
    FROM Friends f
    LEFT JOIN User u
    ON f.Friend = u.ID
    WHERE User = ${user}`


  db.query(query, null, (err, results) => {
    if (err) {
      res.status(404).send(`You have no friends.`);
    } else {
      console.log(results)
      res.send(results);
    }
  })

}

module.exports = friendLocations;
