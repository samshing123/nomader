import { Knex } from "knex";

export class ChatRoomService {
    constructor(private knex: Knex) { }

    async geUserIdWhoYouWantToMatch(id: number) {
        const userId: Array<{ id: number }> = await this.knex(
            "users_relationship"
        )
            .select("user2_id")
            .where("user1_id", id);
        return userId;
    }

    async checkAlreadyMatchedUser(myId: number, userId: number) {
        const matchId: Array<{ id: number }> = await this.knex(
            "users_relationship"
        )
            .select("id")
            .where("user1_id", myId)
            .andWhere("user2_id", userId);
        if (matchId.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    async unlikeUser(myId: number, userId: number) {
        const unlike = await this.knex("users_relationship")
            .where("user1_id", myId)
            .andWhere("user2_id", userId)
            .del();
        if (unlike) {
            return true;
        } else {
            return false;
        }
    }

    async checkChatRoomId(id: number, userId: number) {
        const roomOneId: Array<{ id: number }> = await this.knex("chat_rooms")
            .select("id")
            .where("user_manager_id", id)
            .andWhere("user_member_id", userId);
        const roomTwoId: Array<{ id: number }> = await this.knex("chat_rooms")
            .select("id")
            .where("user_manager_id", userId)
            .andWhere("user_member_id", id);
        if (roomOneId.length > 0) {
            return roomOneId[0]["id"];
        } else if (roomTwoId.length > 0) {
            return roomTwoId[0]["id"];
        } else {
            return 0;
        }
    }

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    async getAllChatInfo(userId: number) {
        // const roomAsManager: Array<{ id: number }> = await this.knex("chat_rooms")
        //     .join("users", "users.id", '=', "chat_rooms.user_manager_id")
        //     .select("users.username", "users.profile", "chat_rooms.id", "chat_rooms.room_title", "chat_rooms.user_manager_id", "chat_rooms.user_member_id", "chat_rooms.updated_at")
        //     .where("chat_rooms.user_member_id", userId)
        // // .orderBy("chat_rooms.updated_at")
        // const roomAsMember: Array<{ id: number }> = await this.knex("chat_rooms")
        //     .join("users", "users.id", '=', "chat_rooms.user_member_id")
        //     .select("users.username", "users.profile", "chat_rooms.id", "chat_rooms.room_title", "chat_rooms.user_manager_id", "chat_rooms.user_member_id", "chat_rooms.updated_at")
        //     .where("chat_rooms.user_manager_id", userId)
        // // .orderBy("chat_rooms.updated_at")
        // if (roomAsManager.length > 0 || roomAsMember.length > 0) {
        //     return roomAsManager.concat(roomAsMember);
        // } else {
        //     return 0;
        // }

        // with tmp_mx as (
        //     select * 
        //     from chat_rooms 
        //     left join users on users.id = chat_rooms.user_manager_id
        //     where user_manager_id = ?
        // ), tmp_mem as (
        //     select * 
        //     from chat_rooms 
        //     left join users on users.id = chat_rooms.user_manager_id
        //     where user_member_id = ?
        // )
        // select distinct tmp_mx.id, users.username, users.profile, tmp_mx.room_title, tmp_mx.user_manager_id, tmp_mem.user_member_id, tmp_mx.updated_at
        // from users
        // join tmp_mx on users.id = tmp_mx.user_manager_id
        // join tmp_mem on users.id = tmp_mem.user_member_id
        // where not tmp_mx.user_manager_id = tmp_mem.user_member_id
        const roomInvolved = await this.knex.raw(`
        with tmp_mx as (
            select users.username username, chat_rooms.id room_id, chat_rooms.room_title room_title, chat_rooms.user_manager_id room_mx_id, chat_rooms.user_member_id room_mm_id, chat_rooms.updated_at room_updated_at
            from chat_rooms 
            join users on users.id = user_member_id
            where chat_rooms.user_manager_id = ?
            ), tmp_mm as (
                select users.username username, chat_rooms.id room_id, chat_rooms.room_title room_title, chat_rooms.user_manager_id room_mx_id, chat_rooms.user_member_id room_mm_id, chat_rooms.updated_at room_updated_at
                from chat_rooms 
                join users on users.id = user_manager_id
                where chat_rooms.user_member_id = ?
                )
        select *
        from tmp_mx
        union
        select *
        from tmp_mm
        order by room_updated_at desc
        `, [userId, userId])

        console.log(roomInvolved.rows.length)

        return (roomInvolved).rows
    }

    async getLastMessages(room_ids: any[]) {
        const lastMessages: Array<{ message: any }> = await this.knex("chats")
            .select("content")
            .whereIn("chat_room_id", room_ids);

        console.log("lastMessages = ", lastMessages);

        if (lastMessages.length > 0) {
            return lastMessages;
        } else {
            return null;
        }
    }

    async getChatRecords(room_title: any) {
        const chatRecords: Array<any> = await this.knex("chat_rooms")
            // .select("chat_rooms.id")
            .select(
                "chat_rooms.id",
                "chats.content",
                "chats.user_speech_id",
                "chats.image",
                "chats.created_at"
            )
            .where("chat_rooms.room_title", room_title)
            .join("chats", "chats.chat_room_id", "chat_rooms.id");
        // .limit(10)

        console.log("getChatRecords = ", chatRecords);

        if (chatRecords.length > 0) {
            return chatRecords;
        } else {
            return null;
        }
    }

    async getRoomInfoByRoomTitle(uid: number, room_title: string) {
        const roomData_manager: any = await this.knex("chat_rooms")
            .select("users.username", "chat_rooms.id", "chat_rooms.room_title", "chat_rooms.user_manager_id", "chat_rooms.user_member_id", "chat_rooms.updated_at")
            .where("chat_rooms.room_title", room_title)
            .join("users", "users.id", "chat_rooms.user_manager_id")

        const roomData_member: any = await this.knex("chat_rooms")
            .select("users.username", "chat_rooms.id", "chat_rooms.room_title", "chat_rooms.user_manager_id", "chat_rooms.user_member_id", "chat_rooms.updated_at")
            .where("chat_rooms.room_title", room_title)
            .join("users", "users.id", "chat_rooms.user_member_id")


        if (roomData_manager.user_manager_id === uid) {

            return roomData_member

        } else { return roomData_manager }


        // if (roomData.length > 0) {
        //     const managerUser: Array<{ username: string }> = await this.knex("users")
        //         .select("username")
        //         .where("id", roomData[0]["user_manager_id"]);
        //     const memberUser: Array<{ username: string }> = await this.knex("users")
        //         .select("username")
        //         .where("id", roomData[0]["user_member_id"]);
        //     const roomInfo = {
        //         title: roomData[0]["room_title"],
        //         manager: managerUser[0]["username"],
        //         member: memberUser[0]["username"],
        //         updatedDate: roomData[0]["updated_at"]
        //     }
        //     return roomInfo;
        // } else {
        //     return {};
        // }
    }



    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    async getChatRoomInfo(roomId: number) {
        const roomData: Array<{
            room_title: string;
            user_manager_id: number;
            user_member_id: number;
            updated_at: Date;
        }> = await this.knex("chat_rooms")
            .select(
                "room_title",
                "user_manager_id",
                "user_member_id",
                "updated_at"
            )
            .where("id", roomId);
        if (roomData.length > 0) {
            const managerUser: Array<{ username: string }> = await this.knex(
                "users"
            )
                .select("username")
                .where("id", roomData[0]["user_manager_id"]);
            const memberUser: Array<{ username: string }> = await this.knex(
                "users"
            )
                .select("username")
                .where("id", roomData[0]["user_member_id"]);
            const roomInfo = {
                title: roomData[0]["room_title"],
                manager: managerUser[0]["username"],
                member: memberUser[0]["username"],
                updatedDate: roomData[0]["updated_at"],
            };
            return roomInfo;
        } else {
            return {};
        }
    }

    async createChatRoom(myId: number, userId: number, title: string) {
        const newRoom: Array<{ id: number }> = await this.knex("chat_rooms")
            .insert([
                {
                    room_title: title,
                    user_manager_id: myId,
                    user_member_id: userId,
                },
            ])
            .returning("id");
        if (newRoom.length > 0) {
            return newRoom[0]["id"];
        } else {
            return 0;
        }
    }

    async displayChat(roomId: number) {
        const chatData: Array<{
            id: number;
            user_speech_id: number;
            content: string;
            image: string;
            voice: string;
            user_listen_id: number;
            created_at: Date;
        }> = await this.knex("chats")
            .select(
                "id",
                "user_speech_id",
                "content",
                "image",
                "voice",
                "user_listen_id",
                "created_at"
            )
            .where("chat_room_id", roomId);
        if (chatData.length > 0) {
            return chatData;
        } else {
            return [];
        }
    }

    async newChatOfContentAndImage(
        myId: number,
        userId: number,
        newContent: string,
        newImage: string
    ) {
        const newChat: Array<{ id: number }> = await this.knex("chats")
            .insert([
                {
                    user_speech_id: myId,
                    content: newContent,
                    image: newImage,
                    user_listen_id: userId,
                },
            ])
            .returning("id");
        if (newChat.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    async newChatOfOnlyContent(
        myId: number,
        userId: number,
        newContent: string
    ) {
        const newChat: Array<{ id: number }> = await this.knex("chats")
            .insert([
                {
                    user_speech_id: myId,
                    content: newContent,
                    user_listen_id: userId,
                },
            ])
            .returning("id");
        if (newChat.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    async newChatOfOnlyImage(myId: number, userId: number, newImage: string) {
        const newChat: Array<{ id: number }> = await this.knex("chats")
            .insert([
                {
                    user_speech_id: myId,
                    image: newImage,
                    user_listen_id: userId,
                },
            ])
            .returning("id");
        if (newChat.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    async newChatOfVoice(myId: number, userId: number, newVoice: string) {
        const newChat: Array<{ id: number }> = await this.knex("chats")
            .insert([
                {
                    user_speech_id: myId,
                    voice: newVoice,
                    user_listen_id: userId,
                },
            ])
            .returning("id");
        if (newChat.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    async deleteChat(myId: number, chatId: number) {
        const chatData = await this.knex("chats")
            .where("user_speech_id", myId)
            .andWhere("chat_id", chatId)
            .del();
        if (chatData) {
            return true;
        } else {
            return false;
        }
    }

    async openChat(roomTitle: string, userManager: number, userMember: number) {
        const chatData = await this.knex("chat_rooms")
            .insert([
                {
                    room_title: roomTitle,
                    user_manager_id: userManager,
                    user_member_id: userMember,
                },
            ])
            .returning("updated_at");
        return chatData;
    }
}
