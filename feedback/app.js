var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')

var comments = [
    {
        name: '张三1',
        message: '晚饭吃鸡',
        dateTime: '2019.11.11'
    },
    {
        name: '张三2',
        message: '晚饭吃鸡',
        dateTime: '2019.11.11'
    },
    {
        name: '张3',
        message: '晚饭吃鸡',
        dateTime: '2019.11.11'
    },
    {
        name: '张三4',
        message: '晚饭吃鸡',
        dateTime: '2019.11.11'
    },
]

http.createServer(function (request, response) {
    var parseObj = url.parse(request.url,true)
    var pathname = parseObj.pathname
    if (pathname == '/') {
        fs.readFile('./view/index.html',function (err,data) {
            if (err) {
                return response.end('404 not found.')
            }
            var htmlStr = template.render(data.toString(),{
                comments: comments
            })
            response.end(htmlStr)
        })
    } else if (pathname.indexOf('/public/') === 0 ) {
        fs.readFile('.' + pathname,function (err,data) {
            if (err) {
                return response.end('404 not found.')
            }
            response.end(data)
        })
    } else if ( pathname === '/post') {
        fs.readFile('./view/post.html',function (err,data) {
            if (err) {
                return response.end('404 not found.')
            }
            response.end(data)
        })
    } else if (pathname === '/pinglun') {
        console.log('收到请求',parseObj.query)
        var comment = parseObj.query
            comment.dateTime = '2019.12.12'
        comments.unshift(comment)
        response.statusCode = 302
        response.setHeader('Location','/')
        response.end()
    } else {
        fs.readFile('./view/404.html',function (err,data) {
            response.end(data)
        })
    }

    // 发送响应数据 "Hello World"

}).listen(3000);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:3000/');
