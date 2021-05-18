import SocketServer from "./util/socket.js";

const port = process.env.PORT || 3000
const socketServer = new SocketServer({ port })
const server  = await socketServer.start()


console.log('socket server is running at', server.address().port)