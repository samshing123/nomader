export function loadChatListPending() {
    return {
        type: '@@Chat/LOAD_CHAT_LIST_PENDING' as const,
    }
}

export function loadChatListSuccess(chatList?: Array<any> | undefined) {
    return {
        type: '@@Chat/LOAD_CHAT_LIST_SUCCESS' as const,
        chatList,
    }
}

export function loadChatListFail(error: string) {
    return {
        type: '@@Chat/LOAD_CHAT_LIST_FAIL' as const,
        error,
    }
}

export type ChatListActions =
    | ReturnType<typeof loadChatListPending>
    | ReturnType<typeof loadChatListSuccess>
    | ReturnType<typeof loadChatListFail>
