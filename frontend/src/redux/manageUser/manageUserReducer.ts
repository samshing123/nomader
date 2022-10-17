import { ManageUserState } from '../state'
import { ManageUserActions } from './manageUserAction'

const initManageUserState: ManageUserState = {
    userList: [],
    loading: false,
}

export function manageUserReducer(
    state: ManageUserState = initManageUserState,
    action: ManageUserActions
): ManageUserState {
    switch (action.type) {
        case '@@ManageUser/LOAD_USER_LIST_PENDING':
            return {
                ...state,
                loading: true,
                userList: [],
                error: undefined,
            }
        case '@@ManageUser/LOAD_USER_LIST_SUCCESS':
            return {
                ...state,
                loading: false,
                userList: action.userList,
                error: undefined,
            }
        case '@@ManageUser/LOAD_USER_LIST_FAIL':
            return {
                ...state,
                loading: false,
                userList: [],
                error: action.error,
            }
        default:
            return state
    }
}
