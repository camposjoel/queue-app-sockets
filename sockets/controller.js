const TicketControl = require('../models/ticketControl')

const ticketControl = new TicketControl()

const socketController = (socket) => {

  socket.emit('last-ticket', ticketControl.last)
  socket.emit('estado-actual', ticketControl.last4)
  socket.emit('pending-tickets', ticketControl.tickets.length)

  socket.on('next-ticket', (payload, callback) => {
    const next = ticketControl.next()
    callback(next)

    //TODO: notificar que hay un ticket pendiente de asignar
    socket.broadcast.emit('pending-tickets', ticketControl.tickets.length)
  })

  socket.on('resolve-ticket', ({ desk }, callback) => {
    if (!desk) {
      return callback({
        ok: false,
        msg: 'El escritorio es obligatorio'
      })
    }

    const ticket = ticketControl.resolveTicket(desk)

    socket.broadcast.emit('estado-actual', ticketControl.last4)
    socket.emit('pending-tickets', ticketControl.tickets.length)
    socket.broadcast.emit('pending-tickets', ticketControl.tickets.length)

    if (!ticket) {
      return callback({
        ok: false,
        msg: 'Ya no hay tickets pendientes'
      })
    } else {
      callback({
        ok: true,
        ticket
      })
    }
  })
}

module.exports = {
  socketController
}