import { Dispatch } from "react";
import { getUserChatRooms } from "../../api/chat";
import { ChatListActions, loadChatListFail, loadChatListPending, loadChatListSuccess } from "./chatAction";

export function getAllChatRoomsInfo(user_id: any) {
    return async function (dispatch: Dispatch<ChatListActions>) {
        try {
            dispatch(loadChatListPending());
            const result: any = await getUserChatRooms(user_id);
            dispatch(loadChatListSuccess(result.data));
            console.log("<chatThunk> Thunk Data Result = ", result);
            console.log("<chatThunk> ChatList = ", result.data);
            return result;
        } catch (err: any) {
            dispatch(loadChatListFail(err.message));
            return err.message;
        }
    };
}
