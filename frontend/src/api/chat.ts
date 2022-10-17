
import { fetchJson } from "./utils";

const { REACT_APP_API_SERVER } = process.env;

export interface User {
    id: number;
    username: string;
}

export interface UserChatRooms {
    room_id: string
    username: string
    profile: string
    lastMessage: string
    lastMessageTime: string
    updated_at: string
}

export async function getUserChatRooms(userId: number) {
    return fetchJson<any>(`${REACT_APP_API_SERVER}/chat/getUserChatRooms`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ uid: userId }),
    });
}

export async function getRoomInfo(roomId: any) {
    return fetchJson<any>(`${REACT_APP_API_SERVER}/chat/getRoomInfo`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ room_ids: roomId }),
    });
}


export async function getLastMessages(roomIds: any[]) {
    return fetchJson<any>(`${REACT_APP_API_SERVER}/chat/getLastMessages`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ room_ids: roomIds }),
    });
}

export async function getChatRecords(room_title: string) {
    return fetchJson<any>(`${REACT_APP_API_SERVER}/chat/getChatRecords`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ room_title: room_title }),
    });
}

export async function getRoomInfoByRoomTitle(uid: number, room_title: string) {
    return fetchJson<any>(`${REACT_APP_API_SERVER}/chat/getRoomInfoByRoomTitle`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ uid: uid, room_title: room_title }),
    });
}