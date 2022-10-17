import { Dispatch } from "react";
import { getAllUsers } from "../../api/user";
import { loadUserListPending, loadUserListSuccess, loadUserListFail, ManageUserActions } from "./manageUserAction";

export function getAllUsersList() {
    return async function (dispatch: Dispatch<ManageUserActions>) {
        try {
            dispatch(loadUserListPending());
            const result: any = await getAllUsers();
            dispatch(loadUserListSuccess(result.userList));
            // console.log("Thunk Data Result = ", result);
            // console.log("UserList = ", result.userList);
            return result;
        } catch (err: any) {
            dispatch(loadUserListFail(err.message));
            return err.message;
        }
    };
}
