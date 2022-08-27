const TwitchChatBot = require('./models/TwitchChatBot');

const fs = require('fs');
const path = require('path');

const config = require('./config');

// Require depedancies
// express is used for handling incoming HTTP requests "like a webserver"
const express = require('express');
// bodyparser is for reading incoming data
const bodyParser = require('body-parser');
// cypto handles Crpytographic functions, sorta like passwords (for a bad example)
const crypto = require('crypto');
// got is used for HTTP/API requests
const axios = require('axios');

// Express basics
const app = express();
const http = require('http').Server(app);
http.listen(config.port, function () {
  console.log('Server raised on', config.port);
});

/* Session */
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// For production see the node in the README.md
// ## Nginx and Cookie Security
// https://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely

// Setup a session manager
app.use(
  session({
    secret: crypto.randomBytes(4).toString('base64'),
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 30 * 60 * 1000,
    },
    rolling: true,
  })
);

// Using Pug to make rendering easier
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.basedir = path.join(__dirname, 'views');

app.set('view options', {
  debug: false,
  compileDebug: false,
});

// need a script
app.use(express.static(path.join(__dirname, 'public')));

/* Flash Warnings/Error handler */
app.use(async function (req, res, next) {
  var flash = {
    error: req.session.error ? req.session.error : false,
    warning: req.session.warning ? req.session.warning : false,
    success: req.session.success ? req.session.success : false,
  };
  res.locals.flash = flash;

  if (req.session.error) {
    req.session.error = '';
  }
  if (req.session.warning) {
    req.session.warning = '';
  }
  if (req.session.success) {
    req.session.success = '';
  }

  next();
});

// Routes
app
  .route('/')
  .get(async (req, res) => {
    try {
      // test for query string parameters
      let { code, error, error_description, scope, state } = req.query;

      if (code) {
        // first validate the state is valid
        state = decodeURIComponent(state);

        /* 
        technically I could just be fine with these 2 lines to get a chat bot working 
        const chatBot = new TwitchChatBot();
        await chatBot.launch();
        but for that to work i have to manually open the url to get the authorization code, so I made my own view to generate it to make the process easier
        */
        const chatBot = new TwitchChatBot();
        await chatBot.launch(code);

        return res.render('loggedin', {
          client_id: config.twitch.client_id,
          redirect_uri: config.twitch.redirect_uri,
          state: req.session.state,
        });
      }

      res.render('generator', {
        client_id: config.twitch.client_id,
        redirect_uri: config.twitch.redirect_uri,
        state: req.session.state,
      });
    } catch (err) {
      throw err;
    }
  })
  .post((req, res) => {
    console.log('Incoming post request');
    res.redirect('/');
  });

app.route('/logout/').get((req, res) => {
  return res.redirect('/');
});
