const express = require('express');
const db = require('../../db/index.js');

const handleEditTasks = (req, res) => {
  let User_ID = req.body.UserID;
  let Task_Title = req.body.title;
  let Task_Description = req.body.description;
  let Start = req.body.startTime;
  let End = req.body.endTime;
  let Frequency = req.body.frequency;
  let Category_ID = req.body.category;
  let Marker_ID = req.body.markerID;
  let Task_ID = req.body.taskID;
  
  let update = `UPDATE Tasks SET
    Task_Title='${Task_Title}',
    Task_Description='${Task_Description}',
    Start='${Start}',
    End='${End}',
    Frequency='${Frequency}',
    Category_ID='${Category_ID}',
    Marker_ID='${Marker_ID}'
    WHERE Task_ID='${Task_ID}'`;

  db.query(update, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error deleting the task: ${err}`);
    } else {
      res.status(200).send(results);
    }
  })
}

module.exports = handleEditTasks;
