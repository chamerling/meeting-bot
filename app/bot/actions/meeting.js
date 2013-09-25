//
//
//

var utils = require('../../utils')
  , mongoose = require('mongoose')
  , Meeting = mongoose.model('Meeting')

module.exports = function(bot) {

  bot.on('message', function(message) {
    if (utils.startsWith(message.payload, '#startmeeting')) {

      Meeting.current(function(err, meeting) {
        if (meeting) {
          return bot.reply(message, "Meeting is already started since " + meeting.start);
        } else {
          Meeting.create({start : new Date(), name : message.payload}, function(err, meeting) {
            if (err) {
              console.log(err);
            } else {
              bot.reply(message, 'Meeting is now started');
            }
          });
        }
      });
    } else if (utils.startsWith(message.payload, '#endmeeting')) {
      Meeting.current(function(err, meeting) {
        if (meeting) {
          meeting.end = new Date();
          Meeting.update(meeting._id, {stop : new Date()}, function(err, meeting) {
            if (err) {
              // TODO : Save error
              console.log(err);
              bot.reply(message, 'Error: admin, please check bot logs');
            } else {
              bot.reply(message.payload, 'Meeting end, thanks all!!!');

              // TODO : create meeting summary and send to channels.
            }
          });
        } else {
          bot.reply(null, 'Error : There is no meeting started');
        }
      })
    }
  });
}