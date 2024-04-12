const express = require("express");
const socket = require("socket.io");
const cors = require("cors");
const morgan = require("morgan");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const app = express();
const http = require("http");
const server = http.createServer(app);

const loadenv = require("./configs/envs");
loadenv();

const extentionSocket = require("./services/socket");

const connectToDatabase = require("./services/db");
const v1 = require("./routers/index.router");

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10000, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Add Helmet
app.use(helmet());

// Add morgan middleware
app.use(morgan("dev"));

// Add body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add cors middleware
app.use(cors());

app.use("/v1/api", v1);

// Socket
const io = socket(server, {
    cors: {
        origin: "*", // Replace with your client's domain
        methods: ["GET", "POST"],
    },
});

extentionSocket(io);

const PORT = process.env.PORT || 5505;

console.log(process.env.MONGODB);

// Start the server
server.listen(PORT, async () => {
    await connectToDatabase();
    console.log(`Server started on port ${PORT}`);
});
