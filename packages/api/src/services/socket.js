const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const extentionSocket = (io) => {
    io.use((socket, next) => {
        const token = socket?.handshake?.query?.token || "";

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new Error("Authorization error"));
            }

            socket.user = decoded;
            next();
        });
    });

    io.on("connection", (socket) => {
        console.log(socket.id);

        setInterval(() => {
            const product = {
                images: [
                    "https://picsum.photos/500",
                    "https://picsum.photos/1000",
                    "https://picsum.photos/4000",
                ],
                info: {
                    name: "Gucci Bag",
                    price: Math.floor(Math.random() * 1000),
                    info: "Gucci Bag Description",
                },
            };

            // socket.emit("product", product);
        }, 5000);

        socket.on("join", (room) => {
            socket.join(room);
        });

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
};

module.exports = extentionSocket;
