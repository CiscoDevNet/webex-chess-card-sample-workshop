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

framework.hears('new', (bot, trigger) => {
    bot.sendCard(chess.start(), "Sorry, it appears your client cannot render adaptive card attachments");
});

framework.on('attachmentAction', async (bot, trigger) => {
    let from = trigger.attachmentAction.inputs.moveFrom;
    let to = trigger.attachmentAction.inputs.moveTo;
    let currentBoard = trigger.attachmentAction.inputs.currentBoard;

    bot.sendCard(chess.move(currentBoard, from, to), "Sorry, it appears your client cannot render adaptive card attachments");
});