import { UserListState } from "../state"

export function loadUserListPending() {
    return {
        type: '@@ManageUser/LOAD_USER_LIST_PENDING' as const,
    }
}

export function loadUserListSuccess(userList?: Array<UserListState> | undefined) {
    return {
        type: '@@ManageUser/LOAD_USER_LIST_SUCCESS' as const,
        userList,
    }
}

export function loadUserListFail(error: string) {
    return {
        type: '@@ManageUser/LOAD_USER_LIST_FAIL' as const,
        error,
    }
}

export type ManageUserActions =
    | ReturnType<typeof loadUserListPending>
    | ReturnType<typeof loadUserListSuccess>
    | ReturnType<typeof loadUserListFail>
