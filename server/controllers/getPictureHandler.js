const express = require('express');
const db = require('../../db/firebase.js');

const getPictureHandler = (req, res) => {
    var callback = function(val) {
        res.send(val)
    }
    var picture = req.body.picture;
    var username = req.query.username;
    var usersRef = db.ref(`/users`);
    var userRef = db.ref(`/users/${username}`);
    usersRef.once('value', snapshot => {
      let user = snapshot.val()[username];
      callback(user)
    })
}


module.exports = getPictureHandler;
