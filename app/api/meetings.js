//
//
//

var mongoose = require('mongoose')
  , Meeting = mongoose.model('Meeting')

/**
 * Get Meetings list
 *
 * @param req
 * @param res
 */
exports.list = function(req, res) {
  Meeting.find({}, function (err, meetings) {
    if (err) {
      res.json(500, {error : err});
    } else {
      res.json(meetings);
    }
  })
}

/**
 * Get a meeting
 *
 * @param req
 * @param res
 */
exports.meeting = function(req, res) {
  Meeting.findById(req.params.id, function(err, meeting) {
    if (err) return res.send(500, err);
    if (!meeting) return res.json(404, {error : 'Can not find meeting with ID:' + req.params.id});
    res.json(meeting);
  })
}

/**
 * Create a meeting
 *
 * @param req
 * @param res
 */
exports.create = function(req, res) {
  Meeting.create(req.body, function(err, savedMeeting) {
    if (err) {
      res.json(500, {error : err});
    } else {
      res.json(201, savedMeeting);
    }
  });
}

/**
 * Delete a meeting
 *
 * @param req
 * @param res
 */
exports.delete = function(req, res) {
  Meeting.findByIdAndRemove(req.params.id, function(err, meeting) {
    if (err) return res.json(500, {error : err});
    if (!meeting) return res.json(404, {error : 'Can not find meeting with ID:' + req.params.id});
    res.send(204);
  });
};

/**
 * Update a meeting
 *
 * @param req
 * @param res
 */
exports.update = function(req, res) {
  Meeting.findByIdAndUpdate(req.params.id, req.body,function(err, meeting) {
    if (err) return res.send(500, {error : err});
    if (!meeting) return res.json(404, {error : 'Can not find meeting with ID:' + req.params.id});
    res.send(200);
  });
}
