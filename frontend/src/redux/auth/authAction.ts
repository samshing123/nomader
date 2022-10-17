export function loginPending() {
    return {
        type: "@@Auth/LOGIN_PENDING" as const,
    };
}

export function loginSuccess(username?: string, id?: number, isAdmin?: boolean, profile?: string) {
    return {
        type: "@@Auth/LOGIN_SUCCESS" as const,
        username,
        id,
        isAdmin,
        profile
    };
}

export function loginFail(error: string) {
    return {
        type: "@@Auth/LOGIN_FAIL" as const,
        error,
    };
}

export type AuthActions =
    | ReturnType<typeof loginPending>
    | ReturnType<typeof loginSuccess>
    | ReturnType<typeof loginFail>;
