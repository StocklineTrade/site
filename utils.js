const nylas = require('nylas');
const { v4: newUuid } = require('uuid');

class StatusCode {
    static SUCCESS = 100;
    static INVALID_INPUT = 200;
    static INVALID_TOKEN = 300;
    static INTERNAL_ERROR = 400;
    static NO_PERMISSION = 500;
    static ALREADY_EXISTS = 600;
    static DOESNT_EXIST = 700;
    static INSUFFICIENT_FUNDS = 800;
}

nylas.config({ clientId: '5n548xucvy8hi40l1bqgh8las', clientSecret: 'ahht37mhdykuwrag7guyg1dyc'});
const EMAIL = nylas.with('U0ZmGOFYyYcGb2gOpDypuShFZDxLqN')

function sendEmail(subject, body, to) {
    let draft = EMAIL.drafts.build({
        subject: subject,
        body: body,
        to: [{ name: 'StocklineTrade Recipient', email: to }]
    });
    return draft.send();
}

const VERIFY_IDS = {};

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomAlphanumeric() {
    let x = randInt(1, 62);
    if (1 <= x && x <= 10) x += 47;
    else if (11 <= x && x <= 36) x += 54;
    else if (37 <= x && x <= 62) x += 60;
    return String.fromCharCode(x);
}

function createUniqueId(length = 6) {
    let id = "";
    for (let i = 0; i < length; i++) id = id + randomAlphanumeric();
    return id;
}