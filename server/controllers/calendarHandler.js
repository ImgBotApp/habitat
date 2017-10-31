const express = require('express');
const db = require('../../db/index.js');
const convertCalendar = require('../../src/components/Calendar/convertCalendar');

const CalendarControler = (req, res) => {
  let tasks = req.body.tasks;

  // let currentTime = new Date().getTime();
  // convertDate(currentTime)
  tasks.map(ele => {
    let { title, description, start, end, frequency, userID, Marker_ID, Category_ID, Google } = ele;
    start = convertCalendar(start);
    end = convertCalendar(end);

    let checkQuery = `SELECT Google FROM Tasks WHERE Google = '${Google}'`

    db.query(checkQuery, (err, result) => {
      if (result.length !== 0) {
        console.log('already exists!')
      } else {
        let eachQuery = `INSERT INTO Tasks 
        (Task_Title, Task_Description, Start, End, Frequency, User_ID, Marker_ID,Category_ID, Google) 
        VALUES ('${title}', '${description}', '${start}', '${end}', '${frequency}', '${userID}', '${Marker_ID}', '${Category_ID}', '${Google}' )`
        db.query(eachQuery, (err, result) => {
          console.log(result);
        })
      }
    })
  })
  res.send('hi')
}

module.exports = CalendarControler;