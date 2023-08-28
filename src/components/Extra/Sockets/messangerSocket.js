import { socket } from "./socket"

export const ChatRoomSocket = (room) => {
    socket.emit("chat:joinroom", room)    
}

export const ChatRoomNotificationSocket = (room) => {
    socket.emit("chat:joinnotificationroom", room)  
}

export const ChatRoomDisconnectSocket = (room) => {
    socket.emit("chat:disconnectroom", room)    
}

export const sendMessageSocket = (msg_id) => {
    socket.emit("message:send", {id: msg_id})    
}

export const deleteMessageSocket = (msg_id, dialog_id) => {
    socket.emit("message:delete", {id: msg_id, dialog_id})    
}

export const CallChatSocket = (user, room, notification_id) => {
    socket.emit("chat:call", {user, room, notification_id})    
}