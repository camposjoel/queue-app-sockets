// Referencias html
const lblDesk = document.querySelector('h1')
const btnResolve = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlert = document.querySelector('.alert')
const lblPendings = document.querySelector('#lblPendientes')

const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
  window.location = 'index.html'
  throw new Error('El escritorio es obligatorio')
}

const desk = searchParams.get('escritorio')
lblDesk.innerText = desk

divAlert.style.display = 'none'

const socket = io()

socket.on('connect', () => {
  btnResolve.disabled = false
})

socket.on('disconnect', () => {
  btnResolve.disabled = true
})

socket.on('pending-tickets', (pendingTickets) => {
  lblPendings.innerText = pendingTickets
})

btnResolve.addEventListener('click', () => {
  
  socket.emit('resolve-ticket', { desk }, ({ok, ticket}) => {
    if (!ok) {
      lblTicket.innerText = 'Nadie.'
      return divAlert.style.display = ''
    }

    lblTicket.innerText = `Ticket ${ticket.number}`
  })
})