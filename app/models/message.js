
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var MessageSchema = new Schema({
    from : String,
    to: String,
    payload : String,
    date : { type : Date, default: Date.now }
  }
);

MessageSchema.pre('save', function(next) {
  console.log('Saving Message', this);
  next();
});

/**
 * Statics
 *
 * @type {{load: Function, list: Function}}
 */
MessageSchema.statics = {

  /**
   * Find meeting by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */
  load: function (id, cb) {
    this.findOne({ _id : id })
      .exec(cb)
  },

  /**
   * Get a list of messages based on criteria
   *
   * @param options
   * @param cb
   */
  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .sort({'date': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  },

  /**
   * Get all the messages between start and end date
   *
   * @param start
   * @param end
   * @param cb
   */
  between: function(start, end, cb) {
    this.find({'date' : { '$gte' : start, '$lt' : end}})
      .sort({'date' : 1})
      .exec(cb)
  }
}

MessageSchema.plugin(require('mongoose-lifecycle'));
module.exports = mongoose.model('Message', MessageSchema);