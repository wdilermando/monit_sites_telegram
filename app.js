const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const telegramRoute = require('./routes/telegram');
const statusRoute = require('./routes/status');
const commandRoute = require('./routes/commands');
const sitesRoute = require('./routes/sites');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/telegram', telegramRoute);
app.use('/status', statusRoute);
app.use('/command', commandRoute);
app.use('/sites', sitesRoute);

module.exports = app;
