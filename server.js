const express = require('express');
const app = express();
const cors = require('cors');
const users = require('./users');
const HOSTNAME = "http://localhost:3000/";

app.use(
    cors({
        origin: '*'
    })
);

const CLIENT_HOME = __dirname + '/routers/client/index.html';
const CLIENT_HOME_CSS = __dirname + '/routers/client/style.css';
const CLIENT_HOME_SCRIPT = __dirname + '/routers/client/script.js';
const ASSETS_GEAR_FAVICON = __dirname + '/data/assets/gear-icon-16x16.png';
const ASSETS_GEAR_ICON = __dirname + '/data/assets/gear-icon-48x48.png';
const NOT_FOUND = __dirname + '/routers/notfound/index.html';
const NOT_FOUND_CSS = __dirname + '/routers/notfound/style.css';

app.get('/', (req, res) => {
    res.sendFile(CLIENT_HOME);
});

app.get('/client-home', (req, res) => {
    res.sendFile(CLIENT_HOME);
});

app.get('/client-home-css', (req, res) => {
    res.sendFile(CLIENT_HOME_CSS);
});

app.get('/client-home-script', (req, res) => {
    res.sendFile(CLIENT_HOME_SCRIPT);
});

app.get('/assets/gear-favicon', (req, res) => {
    res.sendFile(ASSETS_GEAR_FAVICON);
});

app.get('/assets/gear-icon', (req, res) => {
    res.sendFile(ASSETS_GEAR_ICON);
});

app.get('/notfound', (req, res) => {
    res.sendFile(NOT_FOUND);
});

app.get('/notfound-css', (req, res) => {
    res.sendFile(NOT_FOUND_CSS);
});

app.use(function (req, res, next) {
    res.status(404).redirect(HOSTNAME + 'notfound');
});

var server = app.listen(3000);

function save() {
    users.save();
}

process.on("exit", function() {
    save();
    server.close(function() {
        process.exit(0);
    });
});
