import { UserInfoState } from "../state";
import { UserInfoActions } from "./userInfoAction";

const initAuthState: UserInfoState = {
    loading: false,
    interest: null,
};

export function userInfoReducer(
    state: UserInfoState = initAuthState,
    action: UserInfoActions
): UserInfoState {
    switch (action.type) {
        case "@@UserInfo/PENDING":
            return {
                ...state,
                loading: true,
                interest: null,
            };
        case "@@UserInfo/SUCCESS":
            return {
                ...state,
                loading: false,
                interest: action.interest,
            };
        case "@@UserInfo/FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
}
