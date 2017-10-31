const express = require('express');
const db = require('../../db/index.js');

const getFriends = (req, res) => {
  let user = req.query.user;
  console.log(req.query)
  let query = `SELECT Friend, Friend_Name, Pic FROM Friends WHERE User = ${user}`
  db.query(query, null, (err, results) => {
    if (err) {
      res.status(404).send(`You have no friends.`);
    } else {
      console.log(results)
      res.send(results);
    }
  })

}

module.exports = getFriends;
