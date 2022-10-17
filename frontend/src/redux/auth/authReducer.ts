import { AuthState } from "../state";
import { AuthActions } from "./authAction";

const initAuthState: AuthState = {
    isAuthenticated: null,
    loading: false,
};

export function authReducer(
    state: AuthState = initAuthState,
    action: AuthActions
): AuthState {
    switch (action.type) {
        case "@@Auth/LOGIN_PENDING":
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
                error: undefined,
            };
        case "@@Auth/LOGIN_SUCCESS":
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                username: action.username,
                id: action.id,
                isAdmin: action.isAdmin,
            };
        case "@@Auth/LOGIN_FAIL":
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
}
