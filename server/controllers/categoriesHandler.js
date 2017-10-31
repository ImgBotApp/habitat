const express = require('express');
const db = require('../../db/index.js');

const handleCategories = (req, res) => {
  let User_ID = req.query.userID;
  let selectCats = `SELECT * FROM CategoryDeets WHERE User_ID = ${User_ID}`;
  db.query(selectCats, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error looking up the categories ${err}`);
    } else {
      res.status(200).send(results);
    }
  })
}

const handleNewCategories = (req, res) => {
  let User_ID = req.body.userID;
  let Category = req.body.category;
  let Color = req.body.color;
  let insertCategory = `INSERT INTO CategoryDeets (ID, Category, Color, Completion_Points, User_ID, Reward_ID, Marker_ID) VALUES (NULL, '${Category}', '${Color}', NULL, '${User_ID}', NULL, NULL)`;
  db.query(insertCategory, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error creating the category ${err}`);
    } else {
      res.status(201).send(results);
    }
  });
}

module.exports = {
  handleCategories,
  handleNewCategories
}
