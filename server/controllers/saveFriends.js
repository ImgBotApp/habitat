const express = require('express');
const db = require('../../db/index.js');

const saveFriends = (req, res) => {
  // console.log(req.body)
  let user = req.body.user;
  let username = req.body.username;
  let user_fb_id = req.body.userfbID;
  let friend = req.body.friend;
  let friend_name = req.body.friend.name;
  let pic = req.body.pic;

  let findID = `SELECT ID FROM User WHERE Username = ${req.body.friend.id}`

  db.query(findID, null, (err, id) => {
    if (err) {
      res.status(404).send(`You have no friends.`);
    } else {
      let friendID = id[0].ID;

      db.query(`SELECT Friend FROM Friends WHERE User = ${user}`, null, (err, friends) => {
        if(err) {
          res.status(404).send('You have no friends2.')
        } else {
          if(friends.length === 0) {
            db.query(`INSERT INTO Friends (ID, User, User_Name, User_FB, Friend, Friend_Name, Pic) VALUES (NULL, ${user}, '${username}', '${user_fb_id}', ${friendID}, '${friend_name}', '${pic}')`, null, (err, results) => {
              if (err) {
                res.status(404).send(`We encountered an error looking up your tasks: ${err}`);
              } else {
                console.log('successfully saved?')
                res.send('hi')
              }
            })
          } else {
            friends = friends.map(item => item.Friend);
            if (!friends.includes(friendID)) {
              db.query(`INSERT INTO Friends (ID, User, User_Name, User_FB, Friend, Friend_Name, Pic) VALUES (NULL, ${user}, '${username}', '${user_fb_id}', ${friendID}, '${friend_name}', '${pic}')`, null, (err, results) => {
                if (err) {
                  res.status(404).send(`We encountered an error looking up your tasks: ${err}`);
                } else {
                  console.log('successfully saved?')
                  res.send('hi')
                }
              })
            } else {
              res.send()
            }
          }
        }
      })


    }
  })

  // res.send()
}



module.exports = saveFriends;


//xiaomantaos@hotmail.com


// {
// 	"user": 59,
// 	"friends": [
//     {"id": "10159542862480444",
//      "name": "Katie Rose Blacketor"},
//     {
//      "id": "10210669428960084",
//      "name": "Dustin Kim"
//    },
//     {
//      "id": "2185980731858088",
//      "name": "Minwoo  Kim"
//    }
//  ],
// 	"token": "EAAYkpQWypykBANUSDt8a19IPgtPZB7z9gEUYs8b76dqhtXVmkhUBqKnAl8x8rI5V8HPKKIvNBXv4ZCvxBRZCjbZAA97kAjprlb9cSZBSHbvKSFnZBV11PqZAxbnMLR7zHTmRIqKw3CJUsg2oUqmZCUfIZAxwqHFh3jVn6JFrhIpJSQpjk814kxuN66r5DTpCgrsMRILJTVWRbwQZDZD"
// }
