//생활코딩 강좌 내용 참조

var express = require('express')
var app = express()
var fs = require('fs');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var compression = require('compression')
var template = require('./lib/template.js');
var qs = require('querystring');
var bodyParser = require('body-parser');
var topicRouter=require('./routes/topic');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(compression());
app.get('*', function(request, response, next) {
  fs.readdir('./data', function(error, filelist) {
    request.list = filelist;
    next();
  });
});

app.use('/topic',topicRouter);

app.get('/', function(request, response) {
  var title = 'Welcome';
  var description = 'Hello, Node.js';
  var list = template.list(request.list);
  var html = template.HTML(title, list, `<h2>${title}</h2>${description}
    <img src="/images/hello.jpg" style="width:500px;height:300px;">
      `,
    `<a href="/topic/create">create</a>`
  );
  response.send(html);

});



app.use(function(req, res, next) {
  res.status(404).send(`
NOT FOUND
`);
});

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!');
});

app.listen(3005, () => console.log('Example app listening on port 3005!'))
