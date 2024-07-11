const server = require('http').createServer()

const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})

server.listen(4000, console.log('server listening'))


io.on('connection', socket => {
    let room = '';


    socket.on('disconnect', () => {
        console.log(`user disconnect`);
    });
});

