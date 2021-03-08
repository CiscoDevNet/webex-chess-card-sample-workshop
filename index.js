var Framework = require('webex-node-bot-framework');
const fetch = require('node-fetch');
require('dotenv').config();
var chess = require('./chess');

var config = {
    token: process.env.WEBEX_ACCESS_TOKEN
};

var framework = new Framework(config);
framework.start();

framework.hears('hello', (bot, trigger) => {
    bot.say(`Hello ${trigger.person.displayName}!  Say "new" to start a new game of chess`,);
});