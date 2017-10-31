const express = require('express');
const db = require('../../db/index.js');

const handleDeleteTasks = (req, res) => {
  let User_ID = req.query.userID;
  let Task_Title = req.query.taskTitle;
  let deleteTasks = `DELETE FROM Tasks WHERE User_ID = '${User_ID}' AND Task_Title = '${Task_Title}'`;
  db.query(deleteTasks, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error deleting the task: ${err}`);
    } else {
      res.status(200).send(results);
    }
  })
}

module.exports = handleDeleteTasks;
