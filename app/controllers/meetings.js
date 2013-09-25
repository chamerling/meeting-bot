var mongoose = require('mongoose')
  , Meeting = mongoose.model('Meeting')
  , Message = mongoose.model('Message')

/**
 * Get Meetings list
 *
 * @param req
 * @param res
 */
exports.list = function(req, res) {
  var query = {};
  // name filter
  if (req.query.name) {
    query.name = req.query.name;
  }

  Meeting.find(query, function (err, meetings) {
    if (err) {
      res.send(500, err);
    } else {
      res.render('meetings/list', {
        meetings : meetings
      });
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
    if (!meeting) return res.send(404, err);

    Message.between(meeting.start, meeting.stop, function(err, messages) {
      if (err) {
        res.render('500', err);
      } else {
        res.render('meetings/meeting', {
          meeting : meeting,
          messages : messages
        });
      }
    });
  })
}