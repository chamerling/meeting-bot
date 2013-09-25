var mongoose = require('mongoose')
  , should = require('should')
  , request = require('supertest')
  , app = require('../server')
  , context = describe
  , Meeting = mongoose.model('Meeting');

var count;

describe('Meetings', function () {

  this.timeout(50000);

  before(function (done) {
    var meeting = new Meeting(
      {
        name : 'chamerling',
        text : 'foo'
      });
    meeting.save(done);
  })

  describe('GET /api/meetings', function () {
    it('should respond with Content-Type application/json', function (done) {
      request(app)
        .get('/meetings')
        .expect('Content-Type', 'application/json')
        .expect(200)
        .end(done)
    })
  })

  describe('POST /api/meetings', function() {
    // count meetings
    before(function(done) {
      Meeting.count(function(err, cnt) {
        count = cnt;
        done();
      })
    })

    // call the meeting API
    it('post new meeting', function(done) {
      var meeting = {
        name: 'Mila',
        brother: 'Loris'
      }
      request(app)
        .post('/api/meetings')
        .send(meeting)
        .expect(201)
        .end(done)
    })

    // count meeting again
    it('should insert a record to the database', function (done) {
      Meeting.count(function (err, cnt) {
        cnt.should.equal(count + 1)
        done()
      })
    })

    it('should save the meeting in the database', function(done) {
      Meeting.findOne({ name: 'Mila' }).exec(function (err, meeting) {
        should.not.exist(err)
        // FIXME : Find a way to introspect Meeting
        // since brother is not defined in Meeting, is is undefined when calling meeting.brother
        meeting.should.be.an.instanceOf(Meeting)
        var p = JSON.parse(JSON.stringify(meeting));
        p.brother.should.equal('Loris')
        done()
      })
    })
  })

  describe('Static Methods : Load', function(done) {
    var id;
    before(function(done) {
      var meeting = new Meeting(
        {
          name : 'staticload',
          text : 'foo'
        });
      meeting.save(function(err, meeting) {
        should.not.exist(err);
        id = meeting._id;
        done();
      });
    })

    it('Should load meeting meeting ID', function(done) {
      Meeting.load(id, function(err, meeting) {
        should.not.exist(err);
        meeting.should.be.an.instanceof(Meeting);
        meeting._id.should.eql(id);
        done();
      });
    });
  })

  describe('Static Methods : Current', function() {
    var id;
    before(function(done) {
      var meeting = new Meeting({
        start : new Date()
      });
      meeting.save(function(err, meeting) {
        should.not.exist(err);
        id = meeting._id;
        var ended = new Meeting({
          start : new Date(),
          stop : new Date()
        })
        ended.save(function(err, meeting) {
          should.not.exist(err);
          done()
        })
      })
    });

    it('Should find the current meeting', function(done) {
      Meeting.current(function(err, meeting) {
        console.log('Searching meeting with ID', id)
        should.not.exist(err);
        should.exist(meeting)
        meeting._id.should.eql(id);
        done();
      })
    })
  })

  after(function (done) {
    require('./helper').clearDb(done)
  })
})
