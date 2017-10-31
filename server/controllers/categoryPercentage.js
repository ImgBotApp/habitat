const express = require('express');
const db = require('../../db/index.js');

const categoryPercentage = (req, res) => {

    let userID = req.query.username;
    let True = "True";
    let categor =
    `Select Category as name,
    COUNT(t.category_ID) as number,
    Color as color
    FROM CategoryDeets c
    LEFT JOIN Tasks t
    on c.ID = t.Category_ID
    WHERE c.User_ID = ${userID}
    group by 1, 3
    order by 2 desc, 2
    `;

    let countAll = `
      SELECT count(t.Task_ID) as total
      from Tasks t
      where t.user_id = ${userID}
    `

    db.query(countAll, (err, total) => {
      if (err) throw err;
      db.query(categor, (err, results) => {
        if (err) throw err;
        results.forEach(category => {
          category.number = Math.floor(category.number/total[0].total*100);
        })
        // setTimeout(() => {res.send(results)}, 1000)
        res.send(results)
      })
    })
}

module.exports = categoryPercentage;
