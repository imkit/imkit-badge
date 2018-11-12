var express = require('express');
var router = express.Router();

// clientId => { clientId: clientId, total: totalCount, source1: source1Count, source2: source2Count }
var data = {};

/* GET all */
router.get('/', function(req, res, next) {
  var list = [];
  var clients = req.query.clientId
  if (clients) {
    console.log('clients=', clients);
    if (!Array.isArray(clients)) {
      clients = [clients];
    }
    for (var i = 0; i < clients.length; i++) {
      var cid = clients[i];
      var obj = getCache(cid);
      list.push(obj);
    }
  } else {
    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        list.push(data[prop]);
      }
    }
  }
  res.json(list);
});

/* Query a list of clients */
router.post('/', function(req, res, next) {
  var list = [];
  var clients = req.body
  if (!clients || !Array.isArray(clients)) {
    res.status = 400;
    res.end('request body is not a json array');
    return;
  }
  console.log('clients=', clients);
  for (var i = 0; i < clients.length; i++) {
    var cid = clients[i];
    var obj = getCache(cid);
    list.push(obj);
  }
  res.json(list);
});

/* GET by client id */
router.get('/:clientId', function(req, res, next) {
  var clientId = req.params['clientId'];
  var obj = getCache(clientId);
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

  var obj = getCache(clientId);
  obj[source] = count;

  var total = 0;
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop) && prop !== 'clientId' && prop !== 'total') {
      total += obj[prop];
    }
  }
  obj['total'] = total;

  data[clientId] = obj;
  console.log('source:', source, ', count:', count, ', total:', total);

  res.json(obj);
});

function initObj(clientId) {
  return {
    clientId: clientId,
    total: 0,
    badge: 0,
    imkit: 0,
  }
}

function getCache(clientId) {
  var obj = data[clientId];
  if (!obj) {
    obj = initObj(clientId);
  }
  data[clientId] = obj;
  return obj;
}

module.exports = router;
