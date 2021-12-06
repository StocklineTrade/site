const utils = require('./utils');
const fs = require('fs');

function getFileJSON(path, sync = true) {
    let data = sync ? fs.readFileSync(path, err => {}) : fs.readFile(path, err => {});
    return JSON.parse(data);
}

const USERS = getFileJSON('data/users.json');
const VERIFY_MESSAGE =  '<h1 style="text-align: center">Registration</h1>' +
                        '<p style="text-align: center">An account has recently been registered with this email. To proceed, please click "Verify". This account will be terminated next Saturday.</p>' +
                        '<a href="http://localhost:3000/verify?code=%CODE%" style="font: 20px Arial; font-weight: 600; display: block; margin-left: auto; margin-right: auto; width: 5%; text-align: center; padding: 20px; background-color: #00F; color: white; text-decoration: none;">Verify</a>';

const VERIFY_IDS = {};

function getUser(email, password) {
    let user = USERS[email];
    if (user === undefined) return utils.StatusCode.DOESNT_EXIST;
    return user.password === password ? user : utils.StatusCode.INVALID_INPUT;
}

function verifyUser(email, password) {
    if (getUser(email) === utils.StatusCode.INVALID_INPUT) return utils.StatusCode.ALREADY_EXISTS;

    let id = utils.createUniqueId();
    while (VERIFY_IDS[id] !== undefined) id = utils.createUniqueId();
    VERIFY_IDS[id] = { email: email, password: password };
    USERS[email] = { email: email, password: password };

    utils.sendEmail('Verification', VERIFY_MESSAGE.replace('%CODE%',id), email);
    return utils.StatusCode.SUCCESS;
}

function registerUser(email, password, token = utils.newUuid()) {
    let user = getUser(email, password);
    if (typeof user === 'number') return user;
    if (user.token !== undefined) return utils.StatusCode.ALREADY_EXISTS;
    user.token = token;
    return utils.StatusCode.SUCCESS;
}

function save() {
    let data = JSON.stringify(USERS);
    fs.writeFileSync('data/users.json', data);
}