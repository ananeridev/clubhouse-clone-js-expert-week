import http, { request } from 'http'
import { Server } from 'socket.io'
export default class SocketServer {
    // #io membro privado
    #io
    constructor({ port }) {
        this.port = port
    }

    async start() {
            // for default my route is private
            const server = http.createServer((request, response) => {
                // now i'm turning my request public
                response.writeHead(200, {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                })

                response.end('Heyyy there')
            })

            this.#io = new Server(server, {
                cors: {
                    origin: '*',
                    credentials: false
                }
            })

            // just validating if my front end it's working
           const room =  this.#io.of('/room')
           room.on('connection', socket => {
            socket.emit('userConnection', 'socket id se conectou' + socket.id)

            socket.on('joinRoom', (dados) => {
                console.log('dados recebidos', dados)
            })
        })

            // here i'm creating a socket server for my front end access
            return new Promise((resolve, reject) => {
                server.on('error', reject)

                server.listen(this.port, () => resolve(server))
            })
        }
    }