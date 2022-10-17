export function getInfoPending() {
    return {
        type: "@@UserInfo/PENDING" as const,
    };
}

export function getInfoSuccess(interest?: number) {
    return {
        type: "@@UserInfo/SUCCESS" as const,
        interest,
    };
}

export function getInfoFail(error: string) {
    return {
        type: "@@UserInfo/FAIL" as const,
        error,
    };
}

export type UserInfoActions =
    | ReturnType<typeof getInfoPending>
    | ReturnType<typeof getInfoSuccess>
    | ReturnType<typeof getInfoFail>;
