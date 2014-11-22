var ARTICLES = require('../db/articles');
var PHOTOS = require('../db/photos');

module.exports = function(app) {
  var express = require('express');
  var serverRouter = express.Router();
  serverRouter.get('/', function(req, res) {
    res.send({"server":[]});
  });
  app.use('/api/server', serverRouter);

// No-brainer auth: server will authenticate with
// username "ember" and password "casts", respond
// with a token, and forget the token when restarted.

var currentToken;
app.post('/auth.json', function(req, res) {

  var body = req.body,
      username = body.username,
      password = body.password;

  if (username == 'ember' && password == 'casts') {
    // Generate and save the token (forgotten upon server restart).
    currentToken = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    res.status(200).send({
      success: true,
      token: currentToken
    });
  } else {
    res.status(401).send({
      success: false,
      message: 'Invalid username/password'
    });
  }
});

function validTokenProvided(req, res) {

  // Check POST, GET, and headers for supplied token.
  var userToken = req.body.token || req.param('token') || req.headers.token;

  if (!currentToken || userToken != currentToken) {
    res.status(401).send({ error: 'Invalid token. You provided: ' + userToken });
    return false;
  }

  return true;
}

app.get('/articles.json', function(req, res) {
  if (validTokenProvided(req, res)) {
    res.send(ARTICLES);
  }
});

// Returns URL to pic of the day.
app.get('/photos.json', function(req, res) {
  if (validTokenProvided(req, res)) {
    res.send(PHOTOS);
  }
});

};
