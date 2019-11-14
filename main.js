//생활코딩 강좌 내용 참조

var http = require('http');
var fs = require('fs');

//URL 모드를 사용할 예정인것을 선언(URL은 URL의 변수값을 선택해서 queryString을 가져오는거임).

var url = require('url');
var qs = require('querystring');

var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml=require('sanitize-html');
//createServer는 node.js에 접속할 때마다 요청값, 응답값을 준다
var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var title = queryData.id;

  if (pathname === '/') {

    if (queryData.id === undefined) {


      fs.readdir('./data', 'utf8', function(error, filelist) {
        console.log(filelist);
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = template.list(filelist);
        var html = template.HTML(title, list, `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);
      })

    } else {

      fs.readdir('./data', function(error, filelist) {
        var filteredId = path.parse(queryData.id).base;

        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
          var title = queryData.id;
          var sanitizedTitle=sanitizeHtml(title);
          var sanitizedDescription=sanitizeHtml(description,{
            allowedTags:['h1']
          });
          var list = template.list(filelist);
          var html = template.HTML(sanitizedTitle, list, `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
            `<a href="/create">create</a>
            <a href="/update?id=${sanitizedTitle}">update</a>
              <form action="delete_process" method="post" onsubmit="return confirm("삭제 하시겠습니까?)">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="Delete">
              </form>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if (pathname === '/create') {
    fs.readdir('./data', function(error, filelist) {
      fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description) {

        var title = '웹 글쓰기';
        var list = template.list(filelist);
        var html = template.HTML(title, list, `
          <form action="http://localhost:3000/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" rows="8" cols="80" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
          </form>
          `, '');
        response.writeHead(200);
        response.end(html);
      });
    });

  } else if (pathname === '/create_process') {
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
        response.writeHead(302, {
          Location: `/?id=${qs.escape(title)}`
        });
        response.end();
      })

    });
    // response.writeHead(200);
    // response.end("successs");


  } else if (pathname === '/update') {
    fs.readdir('./data', function(error, filelist) {
      var filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {

        var title = queryData.id;
        var list = template.list(filelist);
        var html = template.HTML(title, list, `
          <form action="http://localhost:3000/update_process" method="post">
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
        response.writeHead(200);
        response.end(html);
      });
    });

  } else if (pathname === '/update_process') {
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
          response.writeHead(302, {
            Location: `/?id=${qs.escape(title)}`
          });
          response.end();
        });
      });

    })
  } else if (pathname === '/delete_process') {
    var body = '';
    request.on('data', function(data) {
      body = body + data;
    });

    request.on('end', function() {
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function(error) {
        response.writeHead(302, {
          Location: `/`
        });
        response.end();
      })
    });


  } else {
    response.writeHead(404);
    response.end('Not Found');
  }

});

app.listen(3005);
