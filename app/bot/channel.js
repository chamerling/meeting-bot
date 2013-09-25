//
// Interact with the underlying messaging system.
//

var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , irc = require('irc')

var conf;
var client;

/**
 * Constructor
 *
 * @param conf
 * @constructor
 */
function Channel(conf) {
  EventEmitter.call(this);
  var self = this;
  self.conf = conf;
}

module.exports = Channel;
util.inherits(Channel, EventEmitter);

/**
 * Let's start listening to channel
 */
Channel.prototype.listen = function () {
  console.log('Listening to channel')
  var self = this;

  var client = new irc.Client(self.conf.irc.server, self.conf.irc.nick, self.conf.irc.options);
  client.addListener('error', function(message) {
    console.error('ERROR: %s: %s', message.command, message.args.join(' '));
  });

  client.addListener('message', function (from, to, message) {
    console.log('%s => %s: %s', from, to, message);
    self.emit('message', {
      from: from,
      to: to,
      date: new Date(),
      payload: message
    })
  });

  client.addListener('pm', function(nick, message) {
    client.say(nick, "I am just a bot FTW. Check sources at http://github.com/chamerling/meeting-bot")
  });

  client.addListener('join', function(channel, who) {
    self.emit('join', {
      channel : channel,
      who: who,
      date : new Date()
    })
  });

  client.addListener('part', function(channel, who, reason) {
    self.emit('left', {
      channel : channel,
      who: who,
      date : new Date(),
      reason : reason
    })
  });

  client.addListener('kick', function(channel, who, by, reason) {
    // TODO
  });

  // Handle bot responses
  client.addListener('selfMessage', function(to, message) {
    self.emit('message', {
      from: self.conf.irc.nick,
      to: to,
      date: new Date(),
      payload: message,
      // avoid bot handlers loop : do not process the self messages ie bot responses.
      process: false
    })
  });
  self.client = client;
}

/**
 * Write message to channel
 *
 * @param message
 */
Channel.prototype.write = function(message) {
  this.client.say(this.conf.irc.options.channels[0], message);
}
