const express = require('express')
const app = express()
const socket = require('socket.io')

var port = process.env.PORT || 3000

var server = app.listen(port, function () {
    console.log(`Listening on port ${port}`)
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

app.get('*', (req,res) => {
    res.redirect('https://youtu.be/dQw4w9WgXcQ')
})
