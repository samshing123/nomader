import { Server } from "socket.io";
import { NEW_CHAT_MESSAGE_EVENT } from "./socketEvents";

export default (io: Server) => {
    io.on("connection", (socket) => {
        console.log(`Client ${socket.id} connected`);

        // Join a conversation
        const { roomId } = socket.handshake.query;
        console.log(`<Socket> Room ID = ${roomId}`)
        socket.join(roomId!);

        // Listen for new messages
        socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
            io.in(roomId!).emit(NEW_CHAT_MESSAGE_EVENT, data);
        });

        // Leave the room if the user closes the socket
        socket.on("disconnect", () => {
            console.log(`Client ${socket.id} diconnected`);
            socket.leave(roomId! as string);
        });
    });
};
