var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyDLmev8bdXDc09d7cTSoFyFRl3wkd3tyGg",
    authDomain: "angular-toast.firebaseapp.com",
    databaseURL: "https://angular-toast.firebaseio.com",
    projectId: "angular-toast",
    storageBucket: "angular-toast.appspot.com",
    messagingSenderId: "645192842848"
};


const firebaseApp = firebase.initializeApp(config);

module.exports = firebaseApp.database();
