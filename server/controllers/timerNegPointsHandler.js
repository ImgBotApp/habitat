const express = require('express');
const db = require('../../db/index.js');

const putNegTimerPoints = (req, res) => {
  let user = req.body.user_ID;
  let Negative_Points = req.body.Negative_Points
  
  let update = `UPDATE TimerEcosystem SET
    Negative_Points='${Negative_Points}'
    WHERE User_ID='${user}'`;

  db.query(update, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error deleting the task: ${err}`);
    } else {
      res.status(200).send(results);
    }
  })
}

module.exports = putNegTimerPoints;