const express = require('express');
const db = require('./db/index.js');
const routes = require('./server/routes.js');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');

const app = express();

app.set('jwtTokenSecret', 'ecosystem');
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use('/', routes);
app.use(express.static(__dirname + '/src'));

app.listen(app.get('port'), () => {console.log(`Listening on ${app.get('port')}`)});
