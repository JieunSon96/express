// var express=require('express');
// var router=express.Router();
// var fs = require('fs');
// var path = require('path');
// var sanitizeHtml = require('sanitize-html');
// var template = require('../lib/template.js');
// var qs = require('querystring');
// router.get('/create', function(request, response) {
//   var title = '웹 글쓰기';
//   var list = template.list(request.list);
//   var html = template.HTML(title, list, `
//             <form action="/topic/create_process" method="post">
//             <p><input type="text" name="title" placeholder="title"></p>
//             <p>
//               <textarea name="description" rows="8" cols="80" placeholder="description"></textarea>
//             </p>
//             <p>
//               <input type="submit">
//             </p>
//             </form>
//             `, '');
//   response.send(html);
//
// })
//
// router.post('/create_process', function(request, response) {
//   var post = request.body;
//   var title = post.title;
//   var description = post.description;
//
//   //db 대체제
//   var filteredTitle = path.parse(title).base;
//   fs.writeFile(`data/${filteredTitle}`, description, 'utf8', function(err) {
//     response.redirect(`/topic/${qs.escape(title)}`);
//   })
// })
//
// router.get('/update/:pageId', function(request, response) {
//   var filteredId = path.parse(request.params.pageId).base;
//   fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
//
//     var title = request.params.pageId;
//     var list = template.list(request.list);
//     var html = template.HTML(title, list, `
//             <form action="/topic/update_process" method="post">
//             <input type="hidden" name="id" value="${title}">
//             <p><input type="text" name="title" placeholder="title" value='${title}'></p>
//             <p>
//               <textarea name="description" rows="8" cols="80" placeholder="description">${description}</textarea>
//             </p>
//             <p>
//               <input type="submit">
//             </p>
//             </form>
//             `,
//       `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
//
//     );
//     response.send(html);
//   });
// })
//
//
// router.post('/update_process', function(request, response) {
//
//   var post = request.body;
//   var id = post.id;
//   var title = post.title;
//   var description = post.description;
//
//   var filteredId = path.parse(id).base;
//   var filteredTitle = path.parse(title).base;
//
//   fs.rename(`data/${filteredId}`, `data/${title}`, function(error) {
//     fs.writeFile(`data/${filteredTitle}`, description, 'utf8', function(err) {
//       response.redirect(`/topic/${qs.escape(title)}`);
//     });
//   });
//
// })
//
// router.post('/delete_process', function(request, response) {
//   var post = request.body;
//   var id=post.id;
//   var filteredId = path.parse(id).base;
//   fs.unlink(`data/${filteredId}`, function(error) {
//     response.redirect('/');
//
//   })
//
// })
//
// router.get('/:pageId', function(request, response, next) {
//   fs.readdir('./data', function(error, filelist) {
//     var filteredId = path.parse(request.params.pageId).base;
//
//     fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
//
//
//       if (err) {
//         next(err);
//       } else {
//         var title = request.params.pageId;
//         var sanitizedTitle = sanitizeHtml(title);
//         var sanitizedDescription = sanitizeHtml(description, {
//           allowedTags: ['h1']
//         });
//         var list = template.list(request.list);
//         var html = template.HTML(sanitizedTitle, list, `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
//           `<a href="/create">create</a>
//                  <a href="/topic/update/${sanitizedTitle}">update</a>
//                    <form action="/topic/delete_process" method="post" onsubmit="return confirm("삭제 하시겠습니까?)">
//                    <input type="hidden" name="id" value="${sanitizedTitle}">
//                    <input type="submit" value="Delete">
//                    </form>`
//         );
//
//         response.send(html);
//       }
//
//     });
//
//
//   });
// });
//
// module.exports =router;
