var mongoose = require('mongoose')
  , Message = mongoose.model('Message');

/**
 * Get initial messages for the index page
 *
 * @param req
 * @param res
 */
exports.index = function(req, res) {
  var options = {
    perPage: 10,
    page: 0
  }
  Message.list(options, function(err, messages) {
    if (err) {
      res.render('500', err);
    } else {
      res.render('index',
        {
          messages : messages
        }
      );
    }
  });
}

/**
 * Get messages with pagination
 */
exports.list = function(req, res) {
  var page = req.param('page') > 0 ? req.param('page') : 0
  var perPage = 50
  var options = {
    perPage: perPage,
    page: page
  }

  Message.list(options, function(err, messages) {
    if (err) return res.render('500');
    Message.count().exec(function (err, count) {
      if (err) {
        console.log(err);
        res.render('500', err);
      } else {
        res.render('messages/list', {
          title: 'Messages list',
          messages: messages,
          page: page,
          pages: count / perPage
        })
      }
    })
  })
}