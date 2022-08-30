
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector('#txtMensaje')
const btnSend = document.querySelector('#btnSend')


const socket = io()

socket.on('connect', () => {
  console.log('connected')

  lblOnline.style.display = ''
  lblOffline.style.display = 'none'
})

socket.on('disconnect', () => {
  console.log('disconnected from server')

  lblOnline.style.display = 'none'
  lblOffline.style.display = ''
})

socket.on('send-msj', (payload) => {
  console.log(payload)
})

btnSend.addEventListener('click', () => {
  const msj = txtMensaje.value

  const payload = {
    msj,
    id: '12345',
    date: new Date().toISOString()
  }
  socket.emit('send-msj', payload, (id) => {
    console.log(id)
  })
})