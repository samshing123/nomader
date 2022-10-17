import dotnev from "dotenv";
dotnev.config();

import express from "express";
import cors from "cors";
import http from "http";
import expressSession from "express-session";
import Knex from "knex";
import knexConfigs from "./knexfile";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Added By Danny
// dependencies:
import { Server as socketIO } from "socket.io";
//other modules:
// import socketRouter from "./socket/socketRoute";
import initializeSocketIO from "./socket/socket";
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb" }));

//accept other host
// const allowList = ["*","https://nomader.tecky-kc.me/"];
// app.use(
//     cors({
//         origin: allowList.map((host) => host),
//     })
// );

app.use(
    cors()
);


//service and controller
import { UserService } from "./service/userService";
import { UserController } from "./controller/userController";
import { GetDataController } from "./controller/getDataController";
import { GetDataService } from "./service/getDataService";
import { MatchService } from "./service/matchService";
import { MatchController } from "./controller/matchController";
import { ChatRoomService } from "./service/chatRoomService";
import { ChatRoomController } from "./controller/chatController";

app.use(
    expressSession({
        secret: "Hi this is a secret",
        resave: true,
        saveUninitialized: true,
    })
);

//knex set up
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

//server & controller set up
export const userService = new UserService(knex);
export const userController = new UserController(userService);
export const getDataService = new GetDataService(knex);
export const getDataController = new GetDataController(getDataService);
export const matchService = new MatchService(knex);
export const matchController = new MatchController(matchService);
export const chatRoomService = new ChatRoomService(knex);
export const chatRoomController = new ChatRoomController(chatRoomService);
// export const currencyService = new CurrencyService(knex);
// export const currencyController = new CurrencyController(currencyService);

import { logInRoutes } from "./routers/userRoutes";
import { dataRoutes } from "./routers/getDataRoutes";
import { matchRoutes } from "./routers/matchRoutes";
import { chatRoutes } from "./routers/chatRoutes";
// import { CurrencyService } from "./service/currencyService";
// import { CurrencyController } from "./controller/currencyController";

//route handling
app.use("/user", logInRoutes);
app.use("/data", dataRoutes);
app.use("/match", matchRoutes);
app.use("/chat", chatRoutes);
app.use(express.static("assets"));

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Added By Danny
// app.use(socketRouter);

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const PORT = 8080;

const server = http.createServer(app);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Added By Danny

const io = new socketIO(server, {
    cors: {
        origin: "https://localhost:3000",
        methods: ["GET", "POST"],
    },
});

initializeSocketIO(io);
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

server.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
