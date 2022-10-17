import express from "express";
import { chatRoomController } from "../server";

export const chatRoutes = express.Router();

chatRoutes.post("/getUserChatRooms", chatRoomController.getUserChatRooms);
chatRoutes.post("/getRoomInfo", chatRoomController.getRoomInfo);
chatRoutes.post("/getLastMessages", chatRoomController.getLastMessages);
chatRoutes.post("/getChatRecords", chatRoomController.getChatRecords);
chatRoutes.post("/openChat", chatRoomController.openChat);
chatRoutes.post("/getRoomInfoByRoomTitle", chatRoomController.getRoomInfoByRoomTitle)

