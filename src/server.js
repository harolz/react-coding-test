
var http = require('http');
var fs = require('fs');
// var cors = require('cors');
// const { isObject } = require('util');
var obj;

fs.readFile('countries.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});

var app = http.createServer(function(req,res){
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
  };
  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (['GET', 'POST'].indexOf(req.method) > -1) {
    res.writeHead(200, headers);``
    res.end(JSON.stringify(obj));
    return;
  }

});
// app.use(cors({origin: 'http://localhost:4000'}));
app.listen(4000, '127.0.0.1');
