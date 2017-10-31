const express = require('express');
const db = require('../../db/index.js');

const handleTasks = (req, res) => {
  let User_ID = req.query.User_ID;
  let selectTasks = `SELECT * FROM Tasks WHERE User_ID = '${User_ID}'`;

  db.query(selectTasks, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error looking up your tasks: ${err}`);
    } else {
      res.status(201).send(results);
    }
  })
}

module.exports = handleTasks;
