export interface AuthState {
    isAuthenticated: boolean | null;
    loading: boolean;
    username?: string;
    id?: number;
    error?: string;
    // Added by danny
    isAdmin?: boolean;
    profile?: string;
}

export interface JWTPayload {
    user_id: number;
    username: string;
}

export interface ManageUserState {
    loading: boolean;
    userList: Array<UserListState> | undefined;
    error?: string;
}

export interface ChatListState {
    loading: boolean;
    chatList: Array<any> | undefined;
    error?: string;
}

export interface UserListState {
    first_name: string;
    last_name: string;
    username: string;
    profile?: string;
}

export interface UserInfoState {
    loading: boolean;
    interest?: number | null;
    error?: string;
}
