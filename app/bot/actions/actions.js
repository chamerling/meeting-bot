var utils = require('../../utils')

module.exports = function(bot) {

  bot.on('message', function(message) {

    if (utils.startsWith(message.payload, '#action')) {
      bot.reply(message, 'Action has been recorded');
    }

    if (utils.startsWith(message.payload, '#summary')) {
      bot.reply(message, 'TODO : Get all actions from the current meeting');
    }
  })
}