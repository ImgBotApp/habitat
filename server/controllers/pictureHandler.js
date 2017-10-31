const express = require('express');
const db = require('../../db/firebase.js');


const pictureHandler = (req, res) => {
    var callback = function(val) {
        res.send(val)
    }
    var picture = req.body.picture;
    var username = req.body.username;
    var usersRef = db.ref(`/users`);
    var userRef = db.ref(`/users/${username}`);
    userRef.set({ picture: picture })
    usersRef.child(username).once('value', snapshot => {
        var exists = snapshot.val()
        callback(snapshot.val())
    })
}

module.exports = pictureHandler;
