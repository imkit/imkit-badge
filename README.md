# imkit-badge
Badge Cache Sample

# Test
```
npm test
```

# Default Port
3120
```
var port = normalizePort(process.env.PORT || '3120');
app.set('port', port);
```

# Get all
```
GET /

Response
[
  {
    "clientId": "test-client",
    "total": 123,
    "sourceOne": 123,
    "sourceTwo": 0
  }
]
```

# Get by client ID
```
GET /:clientId

Response
{
  "clientId": "test-client",
  "total": 234,
  "sourceOne": 123,
  "sourceTwo": 111
}
```

# Post
```
POST /:clientId

{
  'source': "SourceOne",
  'count': 123
}

Response
{
  "clientId": "test-client",
  "total": 234,
  "sourceOne": 123,
  "sourceTwo": 111
}
```
