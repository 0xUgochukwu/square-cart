/** @format */

const socketIo = require("socket.io");

let io;

function initSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("A client connected");

        socket.on("disconnect", () => {
            console.log("A client disconnected");
        });
    });
}

function getIo() {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}

module.exports = { initSocket, getIo };
