var assert = require('assert');
var request = require('superagent');
var prefix = require('superagent-prefix')('http://localhost:3120');

describe('Badge', function() {
  before(function() {
    // runs before all tests in this block
    require('../bin/www');
  });

  it('post sourceOne 123', function(done){
    request
    .post('/test-client')
    .use(prefix)
    .send({'source': 'sourceOne', 'count': 123})
    .end(function(err, res){
      assert.equal(200, res.statusCode);
      console.log('res.body=', JSON.stringify(res.body, null, 2));
      if (err) {
        console.error(err);
      }
      assert.equal(123, res.body['total']);
      done(err);
    });
  });

  it('post sourceTwo 111', function(done){
    request
    .post('/test-client')
    .use(prefix)
    .send({'source': 'sourceTwo', 'count': 111})
    .end(function(err, res){
      assert.equal(200, res.statusCode);
      console.log('res.body=', JSON.stringify(res.body, null, 2));
      if (err) {
        console.error(err);
      }
      assert.equal(234, res.body['total']);
      done(err);
    });
  });

  it('get by clientId', function(done){
    request
    .get('/test-client')
    .use(prefix)
    .end(function(err, res){
      assert.equal(200, res.statusCode);
      console.log('res.body=', JSON.stringify(res.body, null, 2));
      if (err) {
        console.error(err);
      }
      assert.equal(234, res.body['total']);
      done(err);
    });
  });

  it('post sourceTwo 0', function(done){
    request
    .post('/test-client')
    .use(prefix)
    .send({'source': 'sourceTwo', 'count': 0})
    .end(function(err, res){
      assert.equal(200, res.statusCode);
      console.log('res.body=', JSON.stringify(res.body, null, 2));
      if (err) {
        console.error(err);
      }
      assert.equal(123, res.body['total']);
      done(err);
    });
  });

  it('listAll', function(done){
    request
    .get('/')
    .use(prefix)
    .end(function(err, res){
      assert.equal(200, res.statusCode);
      console.log('res.body=', JSON.stringify(res.body, null, 2));
      if (err) {
        console.error(err);
      }
      done(err);
    });
  });

});
