import { ChatRoomService } from "../service/chatRoomService";
import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { User } from "../utils/models";

export class ChatRoomController {
    constructor(private chatRoomService: ChatRoomService) { }

    getUserChatRooms = async (req: Request, res: Response) => {
        try {
            const user_id: number = req.body.uid;
            console.log("<getUserChatRooms> user ID", user_id);
            const foundChatRoom = await this.chatRoomService.getAllChatInfo(
                user_id
            );
            // console.log(`<getUserChatRooms> Chat Rooms Found = ${foundChatRoom}`);
            if (!foundChatRoom) {
                res.status(401).json({
                    success: false,
                    message: "No Chat Room",
                });
                return;
            }
            res.status(201).json({
                success: true,
                message: "Chat Room Found",
                data: foundChatRoom,
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

    getRoomInfo = async (req: Request, res: Response) => {
        try {
            const room_ids: any = req.body.room_ids;
            console.log("<getRoomInfo> Room ID", room_ids[0].id);
            const foundRoomInfo = await this.chatRoomService.getChatRoomInfo(
                room_ids[0].id
            );
            console.log(foundRoomInfo);
            if (!foundRoomInfo) {
                res.status(401).json({
                    success: false,
                    message: "No Room Info",
                });
                return;
            }
            res.status(201).json({
                success: true,
                message: "Room Info Found",
                data: foundRoomInfo,
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

    getLastMessages = async (req: Request, res: Response) => {
        try {
            const room_ids: any = req.body.room_ids;
            console.log("<getLastMessages> Room ID", room_ids);
            const foundLastMessages =
                await this.chatRoomService.getLastMessages(room_ids);
            console.log(`<getLastMessages>${foundLastMessages}`);
            if (!foundLastMessages) {
                res.status(401).json({
                    success: false,
                    message: "No Room Info",
                });
                return;
            }
            res.status(201).json({
                success: true,
                message: "Last Messages Found",
                data: foundLastMessages,
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

    getChatRecords = async (req: Request, res: Response) => {
        try {
            const room_title: any = req.body.room_title;
            console.log(
                "<getChatRecords> Room Title [socket room number]",
                room_title
            );
            const foundChatRecords = await this.chatRoomService.getChatRecords(
                room_title
            );
            console.log(`<getChatRecords>${foundChatRecords}`);
            if (!foundChatRecords) {
                res.status(401).json({
                    success: false,
                    message: "No Room Info",
                });
                return;
            }
            res.status(201).json({
                success: true,
                message: "Chat Record Found",
                data: foundChatRecords,
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

    openChat = async (req: Request, res: Response) => {
        try {
            const roomTitle: any = req.body.roomTitle;
            const userManager: number = req.body.userManager;
            const userMember: number = req.body.userMember;

            console.log(userMember, userManager);
            const resp = await this.chatRoomService.openChat(
                roomTitle,
                userManager,
                userMember
            );

            console.log(resp);
            res.status(201).json({
                success: true,
                message: "Chat Room opened",
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };
    getRoomInfoByRoomTitle = async (req: Request, res: Response) => {
        try {
            const uid: number = req.body.uid;
            const room_title: string = req.body.room_title;
            console.log("<getRoomInfoByRoomTitle> Room Title", room_title);
            const foundRoomInfo = await this.chatRoomService.getRoomInfoByRoomTitle(uid, room_title);
            console.log(foundRoomInfo);
            if (!foundRoomInfo) {
                res.status(401).json({
                    success: false,
                    message: "No Room Info",
                });
                return;
            }
            res.status(201).json({
                success: true,
                message: "Room Info Found",
                data: foundRoomInfo,
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

}

declare global {
    namespace Express {
        interface Request {
            user?: Omit<User, "password">;
        }
    }
}
