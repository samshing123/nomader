import React, { useEffect, useState } from 'react'
import {
    Box,
    VStack,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Button,
    Icon,
    HStack,
} from '@chakra-ui/react'
import Nav from '../common/navBar/NavBar'
import Dock from '../common/dock/Dock'
import { AuthState, ChatListState } from '../../redux/state'
import { useDispatch, useSelector } from 'react-redux'
import ChatList from './chatList'
import { getAllChatRoomsInfo } from '../../redux/chat/chatThunk'
import { RootThunkDispatch } from '../../redux/store'

import styles from './chatHome.module.css'
import { AddIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

interface IChatUser {
    room_id: string
    username: string
    profile: string
    lastMessage: string
    lastMessageTime: string
}

export default function ChatHome() {
    // ----------------------------------------------------------------------------

    const dispatch = useDispatch<RootThunkDispatch>()
    const navigate = useNavigate()

    const auth: AuthState = useSelector((state: any) => state.auth)

    const chatRoomList: ChatListState = useSelector(
        (state: any) => state.chatList
    )

    const [roomInfo, setRoomInfo] = React.useState<IChatUser>()

    const [roomList, setRoomList] = useState<Array<any>>([])

    useEffect(() => {
        const getAllChatRooms = dispatch(
            getAllChatRoomsInfo(auth.id as number)
        ).then((result) => {
            if (result.success) {
                console.log('<getAllChatRooms> Fetch Success')
                console.log('<getAllChatRooms> User Chat Rooms and Info: ')
                console.table(result.data)

                setRoomList(
                    result.data.map((item: any) => ({
                        ...item,
                        newItem: 'Hello, I want to add last messages here',
                    }))
                )

                return result.data
            } else {
                console.log('<getAllChatRooms> Fetch Fail')
            }
        })
    }, [])

    // console.log('<[State] roomList --Outside--> = ', roomList)
    // console.log('<[State] roomInfo --Outside--> = ', roomInfo)
    // console.log('<[REDUX State] chatList --Outside--> = ', chatList)

    // ----------------------------------------------------------------------------

    return (
        <Box
            w="auto"
            h="full"
            display="flex"
            flexDirection="column"
            justifyContent="center"
        >
            {/* === NavBar === */}
            <Nav />

            <VStack w="98vw" mt={6} justifyContent="center" alignItems="center">
                <HStack
                    w="100%"
                    className={styles.head}
                    justifyContent="space-around"
                >
                    <Box w={'80%'} pl={5} justifyContent="center">
                        <Text
                            className={styles.headTitle}
                            as="h1"
                            textAlign={'center'}
                            color={useColorModeValue('#1d1d42', '#B0D8BC')}
                        >
                            Chat
                        </Text>
                    </Box>
                    <Box className={styles.btnBox}>
                        <Button
                            className={styles.addbtn}
                            bgImage={
                                'linear-gradient(to right,#569ee6, #67d6f8, #b0d8bc)'
                            }
                            onClick={() => {
                                navigate('/newPost')
                            }}
                        >
                            <Icon as={AddIcon} w={6} h={6} />
                        </Button>
                    </Box>
                </HStack>

                <Box
                    w="85vw"
                    h="100%"
                    maxW={'container.lg'}
                    maxH="full"
                    scrollBehavior="smooth"
                    overflowY="auto"
                    overflowX="hidden"
                >
                    <Table
                        className={styles.messageTable}
                        bg={useColorModeValue('white', 'gray.600')}
                        w="100%"
                    >
                        <Thead
                            position="sticky"
                            top={0}
                            bg={useColorModeValue('white', 'gray.600')}
                            zIndex={10}
                        >
                            <Tr>
                                <Th
                                    pl={2}
                                    fontSize={{ base: 'lg', lg: 'xl' }}
                                    fontWeight={'bold'}
                                >
                                    Message
                                </Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {/* ==== ChatList ==== */}
                            <ChatList chatRoomList={roomList} />
                        </Tbody>
                    </Table>
                </Box>
            </VStack>
            <Dock />
        </Box>
    )
}
