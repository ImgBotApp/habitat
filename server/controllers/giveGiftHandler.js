const express = require('express');
const db = require('../../db/index.js');

const handleGiveGift = (req, res) => {
  let Marker_ID = req.body.friendEcosystem;
  let ID = req.body.userId

  let markerUpdate = `UPDATE Marker SET
    GiftPoints = GiftPoints + 1
    WHERE Marker_ID = '${Marker_ID}'`;

  let userUpdate = `UPDATE User SET
    Gift_Points = Gift_Points - 1
    WHERE ID = '${ID}'`;

  db.query(markerUpdate, null, (err, results0) => {
    if (err) {
      res.status(404).send(`We encountered an error changing the marker: ${err}`);
    } else {
      db.query(userUpdate, null, (err, results1) => {
        if (err) {
          res.status(404).send(`We encountered an error decreasing gifts in user: ${err}`);
        } else {
          res.status(200).send(results1);
        }
      })
    }
  })
}

module.exports = handleGiveGift;