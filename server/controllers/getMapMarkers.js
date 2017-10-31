const express = require('express');
const db = require('../../db/index.js');
const Promise = require("bluebird");
const moment = require('moment');

const convertDate = require('./convertDate')


const getMapMarkers = (req, res) => {
  let userID = req.query.userID;
  let currentDay = req.query.currentDay;
  let today = new Date();
  today = moment(today).format("MMMM Do YYYY");

  let query = `SELECT * FROM Marker WHERE User_ID = ${userID}`;
  let innerQuery = `SELECT * FROM Tasks WHERE User_ID = ${userID} AND LEFT(Start, LOCATE(',', START) -1)='${today}'`;
  let categoryQuery = `SELECT * FROM CategoryDeets WHERE User_ID = ${userID}`;
  
  db.query(query, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error looking up the locations ${err}`);
    } else {
      let length = results.length;
      let count = 0;
      if (length === 0 ) {
        res.send();
      } else {
        for (let i = 0; i < results.length; i++) {
          let marker = results[i]
          db.query(innerQuery, null, (err, tasks) => {
            if (err) {
              res.status(404).send(`We encountered an error looking up the tasks ${err}`);
            } else {
              let copy = tasks.slice(0)
              let sortedByTime = copy.sort((a, b) => {
                let astart = a.Start.split(',')
                let astartTime = astart[1].split(' ');
                let ahour = Number(astartTime[1].split(':')[0]);
                
                if (astartTime[2] === 'pm' && ahour !== 12) {
                  ahour += 12
                } 
                if (astartTime[2] === 'am' && ahour === 12) {
                  ahour = 0;
                }
                let bstart = b.Start.split(',')
                let bstartTime = bstart[1].split(' ');
                let bhour = Number(bstartTime[1].split(':')[0]);
                
                if (bstartTime[2] === 'pm' && bhour !== 12) {
                  bhour += 12
                }
                if (bstartTime[2] === 'am' && bhour === 12) {
                  bhour = 0;
                }
                if (ahour < bhour) {
                  return -1;
                } else if (ahour > bhour) {
                  return 1;
                } else {
                  return 0;
                }
              });
             
              db.query(categoryQuery, null, (err, categories) => {
                if (err) {
                  res.status(404).send(`We encountered an error looking up the categories ${err}`);
                } else {
                  sortedByTime.forEach(task => {
                    categories.forEach(category => {
                      if (task.Category_ID === category.ID) {
                        task.Category = category.Category;
                        task.Color = category.Color;
                        task.Ecosystem = results[i].Ecosystem;
                        if (task.Marker_ID === marker.Marker_ID) {
                          marker.tasks = marker.tasks || [];
                          marker.tasks.push(task)
                        }
                      }
                    })
                  })
                  count++;
                  if (count === length) {
                    res.send(results)
                  }
                }
              })

            }
          });
        }
      }
    }
  })
}

module.exports = getMapMarkers;
