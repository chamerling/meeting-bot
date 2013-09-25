
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var getAttendees = function (attendees) {
  return attendees.join(',')
}

var setAttendees = function (attendees) {
  return attendees.split(',')
}

var MeetingSchema = new Schema({
  name : String,
    // date of the meeting (if planned)
  date : { type : Date, default: Date.now },
  state : String,
  // effective start
  start : {type : Date},
  // effective stop
  stop : {type : Date},
  // markdown agenda
  agenda : String,
  created_at : { type : Date, default: Date.now },
  // attendees list
  attendees: {type: [], get: getAttendees, set: setAttendees},
  actions: {type: []}
  }
);

MeetingSchema.pre('save', function(next) {
  console.log('Saving Meeting', this);
  next();
});

/**
 * Statics
 *
 * @type {{load: Function, list: Function}}
 */
MeetingSchema.statics = {

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
   * Get a list of meetings based on criteria
   *
   * @param options
   * @param cb
   */
  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .sort({'created_at': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  },

  /**
   * Get the current meeting ie the last one which is started by not ended...
   *
   * @param cb callback with err, meeting
   */
  current: function(cb) {
    this.findOne({'stop' : null}).exists('start').sort({'created_at' : -1}).exec(cb);
  },

  // db.collection.find( { field: { $gt: value1, $lt: value2 } } );

  /**
   * Update the meeting with the input data
   *
   * @param id
   * @param data
   * @param cb
   */
  update: function(id, data, cb) {
    this.findByIdAndUpdate(id, data, cb);
  }
}

MeetingSchema.plugin(require('mongoose-lifecycle'));
module.exports = mongoose.model('Meeting', MeetingSchema);