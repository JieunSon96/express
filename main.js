//생활코딩 강좌 내용 참조

var express = require('express')
var app = express()
var fs = require('fs');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var template = require('./lib/template.js');
var qs = require('querystring');

app.get('/', function(request, response) {
  fs.readdir('./data', 'utf8', function(error, filelist) {
    console.log(filelist);
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(filelist);
    var html = template.HTML(title, list, `<h2>${title}</h2>${description}`,
      `<a href="/create">create</a>`
    );
    response.send(html);
  });
});
app.get('/page/:pageId', function(request, response) {
  fs.readdir('./data', function(error, filelist) {
    var filteredId = path.parse(request.params.pageId).base;

    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
      var title = request.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags: ['h1']
      });
      var list = template.list(filelist);
      var html = template.HTML(sanitizedTitle, list, `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        `<a href="/create">create</a>
              <a href="/update/${sanitizedTitle}">update</a>
                <form action="/delete_process" method="post" onsubmit="return confirm("삭제 하시겠습니까?)">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="Delete">
                </form>`
      );

      response.send(html);
    });


  });
});

app.get('/create',function(request,response){
  fs.readdir('./data', function(error, filelist) {
          var title = '웹 글쓰기';
          var list = template.list(filelist);
          var html = template.HTML(title, list, `
            <form action="http://localhost:3005/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" rows="8" cols="80" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
            </form>
            `, '');
          response.send(html);

      });
})

app.post('/create_process',function(request,response){
  var body = '';
      request.on('data', function(data) {
        body = body + data;

        //너무 많은 POST 데이터 정보가 있을 경우, 연결을 끊음!
        //1e6 === 1 * Math.pow(10,6) === 1 * 100000 ~~~ 1MB
        if (body.length > 1e6) {
          request.connection.destroy();
        }

      });

      //정보 수신 끝났을떄 실행됨
      request.on('end', function() {
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;

        //db 대체제
        var filteredTitle=path.parse(title).base;
        fs.writeFile(`data/${filteredTitle}`, description, 'utf8', function(err) {
          response.redirect(`/page/${qs.escape(title)}`);
        })

      });

})

app.get('/update/:pageId',function(request,response){
  fs.readdir('./data', function(error, filelist) {
        var filteredId = path.parse(request.params.pageId).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {

          var title = request.params.pageId;
          var list = template.list(filelist);
          var html = template.HTML(title, list, `
            <form action="http://localhost:3005/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value='${title}'></p>
            <p>
              <textarea name="description" rows="8" cols="80" placeholder="description">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
            </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`

          );
          response.send(html);
        });
      });
})


app.post('/update_process',function(request,response){
  var body = '';
      request.on('data', function(data) {
        body = body + data;

        //너무 많은 POST 데이터 정보가 있을 경우, 연결을 끊음!
        //1e6 === 1 * Math.pow(10,6) === 1 * 100000 ~~~ 1MB
        if (body.length > 1e6) {
          request.connection.destroy();
        }

      });

      //정보 수신 끝났을떄 실행됨
      request.on('end', function() {
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;

        var filteredId=path.parse(id).base;
        var filteredTitle=path.parse(title).base;

        fs.rename(`data/${filteredId}`, `data/${title}`, function(error) {
          fs.writeFile(`data/${filteredTitle}`, description, 'utf8', function(err) {
              response.redirect(`/page/${qs.escape(title)}`);
          });
        });

      })

})

app.post('/delete_process',function(request,response){
  var body = '';
      request.on('data', function(data) {
        body = body + data;
      });

      request.on('end', function() {
        var post = qs.parse(body);
        var id = post.id;
        var filteredId = path.parse(id).base;
        fs.unlink(`data/${filteredId}`, function(error) {
            response.redirect('/');

        })
      });
})

app.listen(3005, () => console.log('Example app listening on port 3005!'))
