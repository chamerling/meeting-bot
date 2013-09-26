# Meeting Bot

Meeting-bot is an IRC bot which provides features to handle developers meetings. It stores all messages, creates reports, etc...
Meeting-bot is powered by node (+ express + jade + socket.io) and mongodb.

## Howto

Install and start mongodb, or use an online provider.

Get the sources:

    git clone https://github.com/chamerling/meeting-bot.git

Install modules:

    cd meeting-bot
    npm install

Change the configuration in config/config.js according to your needs then start:

    npm start
    # or
    node server.js

meeting-bot will connect to the defined IRC channel and starts to record messages (More details on available commands below).
meeting-bot also provides a Web UI with some Websocket support, check it out at http://localhost:3000.

## Commands

TODO!

## TODO

- Replace URIs in HTML pages with withinString (http://medialize.github.io/URI.js/docs.html#static-withinString)
- Replace hashtags in messages
- More actions
- Reports
- regexp
- tests

## License

(The MIT License)

Copyright (c) 2013 Christophe Hamerling &lt;christophe.hamerling@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
