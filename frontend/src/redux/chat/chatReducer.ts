import { ChatListState } from '../state'
import { ChatListActions } from './chatAction'

const initChatListState: ChatListState = {
    chatList: [],
    loading: false,
}

export function chatListReducer(
    state: ChatListState = initChatListState,
    action: ChatListActions
): ChatListState {
    switch (action.type) {
        case '@@Chat/LOAD_CHAT_LIST_PENDING':
            return {
                ...state,
                loading: true,
                chatList: [],
                error: undefined,
            }
        case '@@Chat/LOAD_CHAT_LIST_SUCCESS':
            return {
                ...state,
                loading: false,
                chatList: action.chatList,
                error: undefined,
            }
        case '@@Chat/LOAD_CHAT_LIST_FAIL':
            return {
                ...state,
                loading: false,
                chatList: [],
                error: action.error,
            }
        default:
            return state
    }
}
