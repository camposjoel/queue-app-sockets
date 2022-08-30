const express = require('express')
const cors = require('cors')
const { socketController } = require('../sockets/controller')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.server = require('http').createServer(this.app)
    this.io = require('socket.io')(this.server)

    //Middlewares
    this.middlewares()

    //Routes
    this.routes()

    // Sockets
    this.sockets()
  }

  async connectDatabase() {
    await dbConnection()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  routes() {}

  sockets() {
    this.io.on('connection', socketController)
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}/ 🚀`);
    });
  }
}

module.exports = Server
