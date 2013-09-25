
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , irc = {
      server: 'irc.freenode.net',
      nick : 'chamerling-meetingbot',
      options: {
        debug: true,
        port: 6667,
        channels: ['#ow2status']
      }
  }

module.exports = {
  development: {
    irc: irc,
    port: process.env.PORT || 3000,
    host: process.env.HOSTNAME || 'localhost',
    db: 'mongodb://localhost/meetingbot_dev',
    root: rootPath,
    app: {
      name: 'Meeting Bot'
    }
  },
  test: {
    irc: irc,
    port: process.env.PORT || 3000,
    host: process.env.HOSTNAME || 'localhost',
    db: 'mongodb://localhost/meetingbot_test',
    root: rootPath,
    app: {
      name: 'Meeting Bot.test'
    }
  },
  production: {
    // TODO
  }
}
