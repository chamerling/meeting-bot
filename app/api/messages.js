//
//
//

var mongoose = require('mongoose')
  , Message = mongoose.model('Message');

/**
 * Get all messages
 *
 * @param req
 * @param res
 */
exports.all = function(req, res) {
  var query = {};
  // name filter
  if (req.query.name) {
    query.name = req.query.name;
  }

  Message.find(query, function (err, messages) {
    if (err) {
      res.send(500, {error : err});
    } else {
      res.json(messages);
    }
  })
}

/**
 * Get a message
 *
 * @param req
 * @param res
 */
exports.message = function(req, res) {
  Message.findById(req.params.id, function(err, message) {
    if (err) return res.send(500, err);
    if (!message) return res.json(404, {error : 'Can not find message with ID:' + req.params.id});
    res.json(message);
  })
}

/**
 * Create a message
 *
 * @param req
 * @param res
 */
exports.create = function(req, res) {
  Message.create(req.body, function(err, savedMessage) {
    if (err) {
      res.send(500, {error : err});
    } else {
      res.json(201, savedMessage);
    }
  });
}

/**
 * Delete a message
 *
 * @param req
 * @param res
 */
exports.delete = function(req, res) {
  Message.findByIdAndRemove(req.params.id, function(err, message) {
    if (err) return res.send(500, {error : err});
    if (!message) return res.json(404, {error : 'Can not find message with ID:' + req.params.id});
    res.send(204);
  });
};

/**
 * Update a message
 *
 * @param req
 * @param res
 */
exports.update = function(req, res) {
  Message.findByIdAndUpdate(req.params.id, req.body,function(err, message) {
    if (err) return res.send(500, {error : err});
    if (!message) return res.json(404, {error : 'Can not find message with ID:' + req.params.id});
    res.send(200);
  });
}