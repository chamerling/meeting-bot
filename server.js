
var mongoose = require('mongoose')
  , fs = require('fs')
  , path = require('path')
  , express = require('express')

// Load configuration for environment
var env = process.env.NODE_ENV || 'development'
  , conf = require('./config/config')[env];

mongoose.set('debug', conf.debug || false)
mongoose.connect(conf.db);

// boostrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path + '/' + file)
})

var app = express()
  , http = require('http')
  , server = http.createServer(app)

require('./config/express')(app, conf);

var io = require('socket.io').listen(server)
require('./config/routes')(app)

var Bot = require('./app/bot');
var bot = new Bot(app, conf, io);

bot.on('loaded', function(module) {
  console.log('Loaded', module);
})

bot.on('started', function() {
  console.log('The bot has been started');
})

bot.on('message', function(message) {
  if (io) {
    io.sockets.emit('event', message);
  } else {
    console.log('Can not emit to socket.io')
  }
})

bot.on('join', function(info) {
  if (io) {
    io.sockets.emit('join', info);
  }
})

bot.on('left', function(info) {
  if (io) {
    io.sockets.emit('left', info);
  }
})

server.listen(app.get('port'), function(err) {
  if (err) {
    throw err;
  }
  bot.load();
  bot.start();

  console.log('Bot is started on', app.get('port'))
});

// expose app
exports = module.exports = app