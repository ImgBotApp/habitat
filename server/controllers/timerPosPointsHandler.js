const express = require('express');
const db = require('../../db/index.js');

const putPosTimerPoints = (req, res) => {
  let user = req.body.user_ID;
  let Medium_Positive_Points = req.body.Medium_Positive_Points;
  let Large_Positive_Points = req.body.Large_Positive_Points;
  
  let update = `UPDATE TimerEcosystem SET
    Medium_Positive_Points='${Medium_Positive_Points}',
    Large_Positive_Points='${Large_Positive_Points}'
    WHERE User_ID='${user}'`;

  db.query(update, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error adding points to timer: ${err}`);
    } else {
      res.status(200).send(results);
    }
  })
}

module.exports = putPosTimerPoints;