const express = require('express');
const db = require('../../db/index.js');

const handleProfileTasks = (req, res) => {

    let userID = req.query.username;
    let True = "True";
    let taskStr =
    `Select t.*,
    m.Marker_Title,
    m.Avatar,
    m.PositivePoints,
    m.NegativePoints,
    c.Category,
    c.Color
    FROM Tasks t
    LEFT JOIN Marker m
    ON t.Marker_ID = m.Marker_ID
    LEFT JOIN CategoryDeets c
    ON t.Category_ID = c.ID
    WHERE t.User_ID = ${userID}
    `;

    db.query(taskStr, (err, result) => {
      if (err) throw err;
      res.send(result)
    })
}

module.exports = handleProfileTasks;
