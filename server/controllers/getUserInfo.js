const express = require('express');
const db = require('../../db/index.js');

const getUserInfo = (req, res) => {
  let userID = req.query.userID;
  let result = { markers: '', categories: '' };
  let markerQuery = `SELECT Marker_ID, Marker_Title, Avatar FROM Marker WHERE User_ID = '${userID}'`;
  let categoryQuery = `SELECT id, Category, Color FROM CategoryDeets WHERE User_ID = '${userID}'`;

  db.query(markerQuery, (err, markers) => {
    if (err) console.log(err);
    result.markers = markers;
    db.query(categoryQuery, (err, categories) => {
      if (err) console.log(err);
      result.categories = categories;
      if (result.category !== '') {
        res.send(result);
      }
    })
  })
}

module.exports = getUserInfo;