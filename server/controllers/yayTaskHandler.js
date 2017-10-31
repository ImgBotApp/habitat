const express = require('express');
const db = require('../../db/index.js');
const moment = require('moment');

const handleYayTask = (req, res) => {

  let PositivePoints = req.body.positivePoints;
  let Marker_ID = req.body.markerId;
  let Task_ID = req.body.taskId;

  var dateFormat = 'YYYY-MM-DD HH:mm:ss';
  var testDateUtc = moment.utc(new Date());
  var localDate = testDateUtc.local();

  let updateTask = `UPDATE Tasks SET
    Completion='True',
    Time='${localDate}'
    WHERE Task_ID='${Task_ID}'`;

  let updateMarker = `UPDATE Marker SET
    PositivePoints='${PositivePoints}'
    WHERE Marker_ID='${Marker_ID}'`;

  db.query(updateTask, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error deleting the task: ${err}`);
    } else {
      db.query(updateMarker, null, (err, results) => {
        if (err) {
          res.status(404).send(`We encountered an error while updating Marker: ${err}`)
        } else {
          res.status(201).send(`We updated both task and marker: ${JSON.stringify(results)}`)
        }
      })
    }
  })
}

module.exports = handleYayTask;
