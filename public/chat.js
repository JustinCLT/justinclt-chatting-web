const socket = io.connect(window.location.hostname)

var pesan = document.getElementById('pesan');
var nama = document.getElementById('name')
var output = document.getElementById('output')
var button = document.getElementById('send')
var feedback = document.getElementById('feedback')

function t() {
var dateObject = new Date()
var t = dateObject.getHours() + ":" + menit(dateObject.getMinutes()) + ":" + (dateObject.getSeconds());
return t
}

window.setInterval(t, 1000)

button.addEventListener('click', () => {
    if(!pesan.value.length) return alert('Masukkan pesannya!')
    socket.emit('chat', {
        pesan: pesan.value.replace(/</gi, '&lt;'),
        name: localStorage.getItem('username'),
        waktu: t()
    })
    pesan.value = ''
})

pesan.addEventListener('keypress', () => {
    socket.emit('is-typing',localStorage.getItem('username'))
})

pesan.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        if(!pesan.value.length) return alert('Masukkan pesannya!')
        socket.emit('chat', {
            pesan: pesan.value.replace(/</gi, '&lt;'),
            name: localStorage.getItem('username'),
            waktu: t()
        })
        pesan.value = ''
    }
})

if(!localStorage["username"]){
    localStorage.setItem("username" , prompt("Masukkan namamu!"))
}
  
socket.on('chat', data => {
    feedback.innerHTML = ""
    output.innerHTML += `<p><strong>${data.name} (${data.waktu})</strong><br>${data.pesan}</p>`
})

socket.on('connected', () => {
    output.innerHTML += '<p><strong>Seseorang terkoneksi dengan chat ini<strong><p>'
})

socket.on('is-typing', data => {
    feedback.innerHTML = `<p><strong>${data}</strong> sedang mengetik...</p>`
})


function menit(x) {
    if (x < 10) {
    x = `0` + x
}
return x;
}
