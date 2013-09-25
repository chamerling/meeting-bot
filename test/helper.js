//
// Helper for mongo data
//
// Christophe Hamerling - chamerling@linagora.com
//

var mongoose = require('mongoose')
  , async = require('async')
  , Meeting = mongoose.model('Meeting')

/**
 * Clear database
 *
 * @param {Function} done
 * @api public
 */
exports.clearDb = function (done) {
  var callback = function (item, fn) { item.remove(fn) }

  async.parallel([
    function (cb) {
      Meeting.find().exec(function (err, result) {
        async.forEach(result, callback, cb)
      })
    }
  ], done)
}
