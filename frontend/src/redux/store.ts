import {
    combineReducers,
    ThunkDispatch,
    configureStore,
} from "@reduxjs/toolkit";

import type { AuthState, ChatListState, UserInfoState } from "./state";
import { authReducer } from "./auth/authReducer";
import { AuthActions } from "./auth/authAction";
import { UserInfoActions } from "./userInfo/userInfoAction";
import { userInfoReducer } from "./userInfo/userInfoReducer";

import type { ManageUserState } from "./state";
import { manageUserReducer } from "./manageUser/manageUserReducer";
import { ManageUserActions } from "./manageUser/manageUserAction";
import logger from "redux-logger";
import { ChatListActions } from "./chat/chatAction";
import { chatListReducer } from "./chat/chatReducer";



export interface RootState {
    auth: AuthState;
    manageUser: ManageUserState;
    userInfo: UserInfoState;
    chatList: ChatListState;
}

export type RootActions = AuthActions | UserInfoActions | ManageUserActions | ChatListActions;

// export type IRootActions = AuthActions | ManageUserActions

export type RootThunkDispatch = ThunkDispatch<RootState, null, RootActions>;

const rootReducer = combineReducers<RootState>({
    auth: authReducer,
    manageUser: manageUserReducer,
    userInfo: userInfoReducer,
    chatList: chatListReducer,

});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
