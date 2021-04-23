var express = require('express')

var app = express()
var opn = require('opn')
var path = require('path')

var distPath = path.join(__dirname,"../dist_publish");
//静态资源目录入口
app.use(express.static(distPath));

module.exports = app.listen(8081, function (err) {
    if (err) {
        console.log(err)
        return
    }
    var uri = 'http://localhost:' + 8081+"/"
    console.log('Listening at ' + uri + '\n')
    opn(uri)
})