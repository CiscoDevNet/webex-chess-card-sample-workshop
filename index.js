var Framework = require('webex-node-bot-framework');
const fetch = require('node-fetch');
require('dotenv').config();

var config = {
    token: process.env.WEBEX_ACCESS_TOKEN
};

var framework = new Framework(config);
framework.start();

framework.hears('hello', (bot, trigger) => {
    bot.say(`Hello ${trigger.person.displayName}!  Say "new" to start a new game of chess`,);
});

var chess = require('./chess');
framework.hears('new', (bot, trigger) => {
    bot.sendCard(chess.start(), "Sorry, it appears your client cannot render adaptive card attachments");
});

framework.on('attachmentAction', async (bot, trigger) => {
    let from = trigger.attachmentAction.inputs.moveFrom;
    let to = trigger.attachmentAction.inputs.moveTo;
    let currentBoard = trigger.attachmentAction.inputs.currentBoard;

    let newMessage = {
        parentId: trigger.attachmentAction.messageId,
        roomId: trigger.attachmentAction.roomId,
        text: "Sorry, it appears your client cannot render adaptive card attachments",
        attachments: [
            {
                "contentType": "application/vnd.microsoft.card.adaptive",
                "content": chess.move(currentBoard, from, to)
            }
        ]
    };

    const response = await fetch(`https://webexapis.com/v1/messages/${trigger.attachmentAction.messageId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.WEBEX_ACCESS_TOKEN}`
        },
        body: JSON.stringify(newMessage)
    });
    console.log(response);
});