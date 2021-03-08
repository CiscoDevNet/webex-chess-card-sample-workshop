var Framework = require('webex-node-bot-framework');
require('dotenv').config();

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
    console.log(JSON.stringify(trigger,null,4));
});