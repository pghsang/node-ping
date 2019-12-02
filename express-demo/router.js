var express = require('express')

var app = express()

//公开指定目录 就可以通过 /public/xx 的方式访问public 目录中的所有资源
app.use('/public/',express.static('./public'))

app.get('/',function (req,res) {
    res.send('hello express!')
})

app.get('/about',function (req,res) {
    res.send('你好 express!!!!')
})

app.listen(3000,function () {
    console.log('app is running at port 3000.')
})