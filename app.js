const express = require('express')
const app = express()
const socket = require('socket.io')

var server = app.listen(3000, function () {
    console.log('Listening on port 3000')
})

app.use(express.static('public'))

var io = socket(server)

io.on('connection', function (socket) {
    socket.emit('connected', () => {
        io.sockets.emit('connected')
    })

    console.log('seseorang terkonected')

    socket.on('chat', function(data) {
        console.log(data)
        io.sockets.emit('chat', data)
    })

    socket.on('is-typing', data =>{
        io.sockets.emit('is-typing', data)
    })
    
})
