import { constants } from "../../_shared/constants.js"
import SocketBuilder from "../../_shared/SocketBuilder.js"

const socket = new SocketBuilder ({
    socketUrl: constants.socketUrl,
    namespace: constants.socketNamespaces.room
})

const socket = SocketBuilder
    .setOnUserConnected((user) => console.log('user connected'), user)
    .setOnUserDisconnected((user) => console.log('user disconnected'), user)
    .build()

const room = {
    id: Date.now(),
    topic: 'Js Experts tess'
}

const user = {
    img: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
    userName: 'Batman'
}


socket.emit(constants.events.JOIN_ROOM, {user, room})