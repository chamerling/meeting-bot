//
//
//

var fs = require('fs')
  , EventEmitter = require('events').EventEmitter
  , util = require('util')
  , Channel = require('./channel')

var conf
  , app
  , actions = []
  , io
  , channel
  ;

function Bot(app, conf, io) {
  EventEmitter.call(this);
  var self = this;

  self.app = app;
  self.conf = conf;
  self.io = io;
  self.channel = new Channel(conf);
}

module.exports = Bot
util.inherits(Bot, EventEmitter)

/**
 * Load all the bot actions
 */
Bot.prototype.load = function() {
  console.log('Bot is loading actions...');

  var self = this;

  // TODO : filter from config
  var actions = __dirname + '/actions';
  fs.readdirSync(actions).forEach(function(file) {
    require(actions + '/' + file)(self);
    self.emit('loaded', file);
  });

  console.log('... loaded!')
}

Bot.prototype.start = function() {
  var self = this;

  self.channel.on('message', function(message) {
    // consume bot messages
    console.log('Got a message from channel:', message);
    // emit the message to listeners (actions)
    self.emit('message', message);
  });

  self.channel.on('join', function(info) {
    console.log(info.who + ' joined the channel ' + info.channel);
    self.emit('join', info);
  });

  self.channel.on('left', function(info) {
    console.log(info.who + ' left the channel ' + info.channel);
    self.emit('left', info);
  });

  self.channel.listen();
  this.emit('started');
}

/**
 * Reply to the bot. Used by message processors.
 *
 * @param message
 * @param response
 */
Bot.prototype.reply = function(message, response) {
  var self = this;
  if (response) {
    self.channel.write(response);
  } else {
    console.log('Can not get response for this message...');
  }
}

exports.Bot = Bot;