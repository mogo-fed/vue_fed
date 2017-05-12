var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
var users = {};
io.on('connection', function(socket) {
    //动态向对象中添加key value
    socket.on('chat message', function(msgInfo) {
        users[msgInfo.fromUserId] = socket;
        console.log('message: ' + msgInfo.msg);
        //io.emit('some event', { for: msgInfo.msg });
        var toSocket = users[msgInfo.toUserId];
        if (toSocket) {
            toSocket.emit('some event', { returnMsg: msgInfo.msg });
            console.log('success'+msgInfo.msg)
        } else {
            console.log('fail'+ users);
            return;
        }
        console.log(Object.keys(users),'======users');
        console.log(msgInfo)
    });

    console.log('a user connected');
    socket.on('disconnect', function(socket) {
        //删除一个对象的属性
        delete users[socket.fromUserId];
        console.log('user disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
