import { constants } from "./constants.js"

export default class SocketBuilder {
    constructor({ socketUrl, namespace }) {
        this.socketUrl = `${socketUrl}/${namespace}`
        
        this.setOnUserConnected = () => {}
        this.setOnUserDisconnected = () => {}
    }

    setOnUserConnected(fn) {
        this.setOnUserConnected = fn

        return this
    }

    setOnUserDisconnected(fn) {
        this.setOnUserDisconnected = fn

        return this
    }

    build() {
        const socket = globalThis.io.connect(this.socketUrl, {
            wihtCredentials: false
        })

        socket.on('connection', () => console.log('conecteeeeei'))

        socket.io(constants.events.USER_CONNECTED, () => this.setOnUserConnected)
        socket.io(constants.events.USER_DISCONNECTED, () => this.setOnUserDisconnected)
     
        return socket;

    }
}