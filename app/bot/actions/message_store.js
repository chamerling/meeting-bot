//
// Stores all messages from the channel...
//

var mongoose = require('mongoose')
  , Message = mongoose.model('Message')

module.exports = function(bot) {
  bot.on('message', function(message) {
    Message.create(message, function(err, savedMessage) {
      if (err) {
        console.log('Can not save message: ', err);
      } else {
        console.log('Message saved', savedMessage);
      }
    });
  });
}