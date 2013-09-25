
var mongoose = require('mongoose')
  , Meeting = mongoose.model('Meeting')
  , Message = mongoose.model('Message');

module.exports = function (app) {

  var meetings = require('../app/controllers/meetings');

  app.get('/meetings', meetings.list);
  app.get('/meetings/:id', meetings.meeting)

  var messages = require('../app/controllers/messages');

  app.get('/messages', messages.list);
  app.get('/', messages.index);

}
