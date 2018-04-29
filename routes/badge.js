var express = require('express');
var router = express.Router();

// clientId => { clientId: clientId, total: totalCount, source1: source1Count, source2: source2Count }
var data = [];

/* GET all */
router.get('/', function(req, res, next) {
  res.json(data);
});

/* GET by client id */
router.get('/:clientId', function(req, res, next) {
  var clientId = req.params['clientId'];
  var obj = data[clientId];
  if (!obj) {
    obj = {
      clientId: clientId,
      total: 0,
    }
  }
  res.json(obj);
});

/* Put by client id */
router.post('/:clientId', function(req, res, next) {
  var clientId = req.params['clientId'];
  var body = req.body;
  var source = body.source;
  if (!source) {
    next(new Error('source is not specified'))
    return;
  }
  source = source + "";

  var count = body.count;
  if (!count) {
    count = 0;
  } else {
    try {
      count = parseInt(count);
    } catch(e) {
      next(e);
      return;
    }
  }

  var obj = data[clientId];
  if (!obj) {
    obj = {
      clientId: clientId,
      total: 0,
    }
  }
  obj[source] = count;

  var total = 0;
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop) && prop !== 'clientId' && prop !== 'total') {
      total += obj[prop];
    }
  }
  obj['total'] = total;

  data[clientId] = obj;

  res.json(obj);
});

module.exports = router;
