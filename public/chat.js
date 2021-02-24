const socket = io.connect('http://localhost:3000')

var pesan = document.getElementById('pesan');
var nama = document.getElementById('name')
var output = document.getElementById('output')
var button = document.getElementById('send')
var feedback = document.getElementById('feedback')

button.addEventListener('click', () => {
    socket.emit('chat', {
        pesan: pesan.value,
        name: nama.value
    })
})

pesan.addEventListener('keypress', () => {
    socket.emit('is-typing',nama.value)
})


  
socket.on('chat', data => {
    if (!data.name) return alert('Masukkan namamu!')
    if (!data.pesan) return alert('Masukkan pesannya!')
    feedback.innerHTML = ""
    output.innerHTML += `<p><strong>${data.name}</strong><br>${data.pesan}</p>`
})

socket.on('connected', () => {
    output.innerHTML += '<p><strong>Seseorang terkoneksi dengan chat ini<strong><p>'
})

socket.on('is-typing', data => {
    feedback.innerHTML = `<p><strong>${data}</strong> sedang mengetik...</p>`
})
