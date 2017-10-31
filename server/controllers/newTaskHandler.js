const express = require('express');
const db = require('../../db/index.js');
const convertDate = require('./convertDate');
const moment = require('moment');

const handleNewTask = (req, res) => {
  let Title = req.body.title;
  let Description = req.body.description;
  let date = req.body.date;
  let Start = convertDate(req.body.startTime);
  let firstStartTime = convertDate(req.body.startTime);
  let End = convertDate(req.body.endTime);
  let firstEndTime = convertDate(req.body.endTime);
  let Frequency = req.body.frequency;
  let Multiple = req.body.numberRecurrences;
  let Days = req.body.days;
  let Category_ID = req.body.category;
  let Marker_ID = req.body.markerID;
  let User_ID = req.body.userID;

  if (Multiple > 0) {
    if (Frequency === 'daily') {
      var lastStartTime = new Date(Start.setDate(Start.getDate()+ Multiple));
      var startingTimes = [];
      var endingTimes = [];
      var insertDaily = `INSERT INTO Tasks (Task_ID, Task_Title, Task_Description, Completion, Start, End, Frequency, Days, User_ID, Category_ID, Marker_ID) VALUES `
      for (var d = firstStartTime; d <= lastStartTime; d.setDate(d.getDate() + 1)) {
        let eachStartTime = new Date(d);
        startingTimes.push(moment(eachStartTime).format("MMMM Do YYYY, h:mm a"));
      }
      var lastEndTime = new Date(End.setDate(End.getDate() + Multiple));

      for (var d = firstEndTime; d <= lastEndTime; d.setDate(d.getDate() + 1)) {
        let eachEndTime = new Date(d);
        endingTimes.push(moment(eachEndTime).format("MMMM Do YYYY, h:mm a"));
      }
      for (var i = 0; i < Multiple; i++) {
        insertDaily += `(null, '${Title}', '${Description}', null, '${startingTimes[i]}', '${endingTimes[i]}', '${Frequency}', '${Days}', '${User_ID}', '${Category_ID}', '${Marker_ID}'),`
      }
      db.query(insertDaily.slice(0, -1), null, (err, result) => {
        if (err) {
          res.status(404).send(`We encountered an error creating the task ${err}`);
        } else {
          res.status(201).send(result);
        }
      })
    } else if (Frequency === 'weekly') {
      var lastStartTime = new Date(Start.setDate(Start.getDate()+ Multiple*7));
      var startingTimes = [];
      var endingTimes = [];
      var insertDaily = `INSERT INTO Tasks (Task_ID, Task_Title, Task_Description, Completion, Start, End, Frequency, Days, User_ID, Category_ID, Marker_ID) VALUES `
      for (var d = firstStartTime; d <= lastStartTime; d.setDate(d.getDate() + 7)) {
        let eachStartTime = new Date(d);
        startingTimes.push(moment(eachStartTime).format("MMMM Do YYYY, h:mm a"));
      }
      var lastEndTime = new Date(End.setDate(End.getDate() + Multiple*7));

      for (var d = firstEndTime; d <= lastEndTime; d.setDate(d.getDate() + 7)) {
        let eachEndTime = new Date(d);
        endingTimes.push(moment(eachEndTime).format("MMMM Do YYYY, h:mm a"));
      }
      for (var i = 0; i < Multiple; i++) {
        insertDaily += `(null, '${Title}', '${Description}', null, '${startingTimes[i]}', '${endingTimes[i]}', '${Frequency}', '${Days}', '${User_ID}', '${Category_ID}', '${Marker_ID}'),`
      }
      db.query(insertDaily.slice(0, -1), null, (err, result) => {
        if (err) {
          res.status(404).send(`We encountered an error creating the task ${err}`);
        } else {
          res.status(201).send(result);
        }
      })
    } else if (Frequency === 'monthly') {
      var lastStartTime = new Date(Start.setDate(Start.getDate()+ Multiple*30));
      var startingTimes = [];
      var endingTimes = [];
      var insertDaily = `INSERT INTO Tasks (Task_ID, Task_Title, Task_Description, Completion, Start, End, Frequency, Days, User_ID, Category_ID, Marker_ID) VALUES `
      for (var d = firstStartTime; d <= lastStartTime; d.setDate(d.getDate() + 30)) {
        let eachStartTime = new Date(d);
        startingTimes.push(moment(eachStartTime).format("MMMM Do YYYY, h:mm a"));
      }
      var lastEndTime = new Date(End.setDate(End.getDate() + Multiple*30));

      for (var d = firstEndTime; d <= lastEndTime; d.setDate(d.getDate() + 30)) {
        let eachEndTime = new Date(d);
        endingTimes.push(moment(eachEndTime).format("MMMM Do YYYY, h:mm a"));
      }
      for (var i = 0; i < Multiple; i++) {
        insertDaily += `(null, '${Title}', '${Description}', null, '${startingTimes[i]}', '${endingTimes[i]}', '${Frequency}', '${Days}', '${User_ID}', '${Category_ID}', '${Marker_ID}'),`
      }
      db.query(insertDaily.slice(0, -1), null, (err, result) => {
        if (err) {
          res.status(404).send(`We encountered an error creating the task ${err}`);
        } else {
          res.status(201).send(result);
        }
      })
    }
  } else {
    let insert = `INSERT INTO Tasks (Task_ID, Task_Title, Task_Description, Completion, Start, End, Frequency, Days, User_ID, Category_ID, Marker_ID) VALUES (null, '${Title}', '${Description}', null, '${moment(Start).format("MMMM Do YYYY, h:mm a")}', '${moment(End).format("MMMM Do YYYY, h:mm a")}', '${Frequency}', '${Days}', '${User_ID}', '${Category_ID}', '${Marker_ID}')`
    db.query(insert, null, (err, results) => {
      if (err) {
        res.status(404).send(`We encountered an error creating the task ${err}`);
      } else {
        res.status(201).send(results);
      }
    })
  }
}

module.exports = handleNewTask;
