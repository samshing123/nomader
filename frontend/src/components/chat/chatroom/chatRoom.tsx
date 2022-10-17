import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import './chatroom.css'
// import styles from './chatroom.module.css'

import useChat from '../useChat'
import {
    Box,
    VStack,
    Text,
    Textarea,
    Button,
    useColorModeValue,
    HStack,
    Icon,
    Avatar,
    Flex,
    Stack,
    useColorMode,
    Menu,
    LinkBox,
    LinkOverlay,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'
import Dock from '../../common/dock/Dock'
import { getChatRecords, getRoomInfoByRoomTitle } from '../../../api/chat'
import { useSelector } from 'react-redux'
import { AuthState, ChatListState } from '../../../redux/state'
import {
    ChevronLeftIcon,
    HamburgerIcon,
    MoonIcon,
    SunIcon,
} from '@chakra-ui/icons'
import { fetchSelfUserProfile } from '../../../api/user'

const { REACT_APP_API_SERVER } = process.env

type Props = {}

const ChatRoom = (props: Props) => {
    const { colorMode, toggleColorMode } = useColorMode()

    let { room_id } = useParams()

    // console.log('<ChatRoom> room_id = ', room_id)

    const auth: AuthState = useSelector((state: any) => state.auth)
    const chatRoomList: ChatListState = useSelector(
        (state: any) => state.chatList
    )

    const today = new Date()

    const [roomInfo, setRoomInfo] = useState<any>('')

    const [messageHistory, setMessageHistory] = useState([])

    const { messages, sendMessage } = useChat(room_id as string)
    const [newMessage, setNewMessage] = useState('')

    const handleNewMessageChange = (event: any) => {
        setNewMessage(event.target.value)
    }

    const handleSendMessage = () => {
        if (newMessage !== '') {
            sendMessage(newMessage)
            setNewMessage('')
        }
    }

    const navigate = useNavigate()
    const [profilePic, setProfilePic] = useState<string>()
    function logOut() {
        localStorage.removeItem('auth_token')
        navigate('/welcome')
    }
    useEffect(() => {
        fetchSelfUserProfile(auth.id as any as number).then((data: any) => {
            const dataDetail = data.userDetail.rows[0]
            const profile = dataDetail.profile
            const profilePath = `${REACT_APP_API_SERVER}/profile/` + profile
            setProfilePic(profilePath)
        })
    }, [])

    useEffect(() => {
        const friendsName = getRoomInfoByRoomTitle(
            auth.id as number,
            room_id as string
        ).then((result) => {
            // console.log(`<getfriendsName> ${result}`)
            if (result.success) {
                // console.log(`<getfriendsName> Friend's Name:`)
                console.table(result.data)

                setRoomInfo(result.data[0])
            }
        })

        const chatRecords = getChatRecords(room_id as string).then((result) => {
            // console.log(`<getChatRecords> ${result}`)
            if (result.success) {
                // console.log(`<getChatRecords> setNeMessageHistory:`)
                console.table(result.data)

                setMessageHistory(result.data.map((item: any) => ({ ...item })))
            }
        })
        return
    }, [])

    const messageEl: React.MutableRefObject<any> = useRef(null)

    useEffect(() => {
        if (messageEl.current !== null) {
            messageEl.current.addEventListener(
                'DOMNodeInserted',
                (event: any) => {
                    const { currentTarget: target } = event
                    target.scroll({
                        top: target.scrollHeight,
                        behavior: 'smooth',
                    })
                }
            )
        }
        return
    }, [])

    console.log('[STATE: roomInfo] = ', roomInfo)

    return (
        <Box
            w="auto"
            h="full"
            display="flex"
            flexDirection="column"
            justifyContent="center"
        >
            {/* === NavBar === */}
            {/* <Nav /> */}
            <Box
                w={'full'}
                h={'100%'}
                bg={useColorModeValue('gray.100', 'gray.900')}
                boxShadow={'0px 1px 2px 0px #DDDDDD'}
            >
                <HStack
                    px={4}
                    py={2}
                    justifyContent={'center'}
                    alignItems={'center'}
                    alignContent={'center'}
                >
                    <div className={'tab'}>
                        <button className={'backwardBtn'}>
                            <Link to="/chat">
                                <Icon
                                    as={ChevronLeftIcon}
                                    w={12}
                                    h={12}
                                    color={useColorModeValue(
                                        '#1d1d42',
                                        '#B0D8BC'
                                    )}
                                />
                            </Link>
                        </button>
                    </div>
                    <HStack
                        pl={2}
                        flex={'1'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        alignContent={'center'}
                        spacing={3}
                    >
                        <HStack justifyContent={'flex-start'}>
                            <Avatar
                                size={{
                                    base: 'md',
                                    lg: 'lg',
                                }}
                                name={roomInfo.username}
                                src={roomInfo.profile}
                            />
                            <Text fontSize={'lg'} fontWeight={'medium'}>
                                {roomInfo.username ? roomInfo.username : ''}
                            </Text>
                        </HStack>
                        <Flex alignItems={'center'}>
                            <Stack direction={'row'} spacing={0}>
                                <Button onClick={toggleColorMode}>
                                    {colorMode === 'light' ? (
                                        <MoonIcon />
                                    ) : (
                                        <SunIcon />
                                    )}
                                </Button>
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}
                                    >
                                        <Icon
                                            as={HamburgerIcon}
                                            boxSize="1.5em"
                                        />
                                    </MenuButton>
                                    <MenuList>
                                        <Box py={1} px={2}>
                                            <HStack
                                                justifyContent={'space-around'}
                                            >
                                                <Avatar
                                                    size={'md'}
                                                    name={auth.username}
                                                    src={profilePic}
                                                />
                                                <Text
                                                    fontSize={'lg'}
                                                    fontWeight={'semibold'}
                                                    textAlign={'center'}
                                                >
                                                    {auth.username}
                                                </Text>
                                            </HStack>
                                        </Box>
                                        <LinkBox>
                                            <MenuItem>
                                                <LinkOverlay
                                                    href="/editProfile"
                                                    style={{
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    Edit Profile
                                                </LinkOverlay>
                                            </MenuItem>
                                        </LinkBox>

                                        {auth.isAdmin ? (
                                            <LinkBox>
                                                <MenuItem>
                                                    <NavLink
                                                        className="controlPanel"
                                                        to={'/control/'}
                                                    >
                                                        Control Panel
                                                    </NavLink>
                                                </MenuItem>
                                            </LinkBox>
                                        ) : (
                                            <></>
                                        )}

                                        <MenuDivider />
                                        <LinkBox>
                                            <MenuItem>
                                                <LinkOverlay
                                                    onClick={logOut}
                                                    style={{
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    Logout
                                                </LinkOverlay>
                                            </MenuItem>
                                        </LinkBox>
                                    </MenuList>
                                </Menu>
                            </Stack>
                        </Flex>
                    </HStack>
                    {/* <Box className="room-name">Room ID: {room_id}</Box> */}
                </HStack>
            </Box>
            <VStack w="98vw" h={'auto'}>
                <Box w={'85%'} h={'100%'}>
                    <Box
                        h={'70vh'}
                        className="messages-container"
                        overflowY={'scroll'}
                        ref={messageEl}
                    >
                        <ol className="messages-list">
                            {messageHistory.map((message: any, idx: number) => (
                                <li
                                    key={idx}
                                    className={`message_item ${
                                        message.user_speech_id === auth.id
                                            ? 'my-message'
                                            : 'received-message'
                                    }`}
                                >
                                    <Text
                                        className="message_header"
                                        fontSize={'1.2em'}
                                        fontWeight={'medium'}
                                    >
                                        {message.user_speech_id === auth.id
                                            ? 'me: '
                                            : `${roomInfo.username}: `}
                                    </Text>
                                    <Text
                                        className="message_content"
                                        fontSize={'1em'}
                                    >
                                        {message.content}
                                    </Text>
                                    <Text
                                        pb={2}
                                        lineHeight={'0.2'}
                                        textAlign={'right'}
                                    >
                                        {/* {message.created_at} */}

                                        {Date.parse(
                                            message?.created_at as string
                                        ) < Date.now()
                                            ? message.created_at
                                                  .split('T', 2)[1]
                                                  .split('.', 1)[0]
                                                  .split(':', 2)
                                                  .join(':')
                                            : message.created_at.split('T', 1)}
                                    </Text>
                                </li>
                            ))}

                            {messages.map((message: any, idx: number) => (
                                <li
                                    key={idx}
                                    className={`message-item ${
                                        message.ownedByCurrentUser
                                            ? 'my-message'
                                            : 'received-message'
                                    }`}
                                    style={
                                        message.ownedByCurrentUser
                                            ? {
                                                  width: 'auto',
                                                  maxWidth: '70%',
                                                  padding: '10px 15px',
                                                  wordBreak: 'break-word',
                                                  borderRadius: '10px',
                                                  color: '#FFFFFF',
                                                  margin: '15px 15px',
                                                  backgroundColor: '#B0D8BC',
                                                  marginLeft: 'auto',
                                                  boxShadow:
                                                      '1px 1px 2px 0px #DDDDDD',
                                              }
                                            : {
                                                  width: 'auto',
                                                  maxWidth: '70%',
                                                  padding: '10px 15px',
                                                  wordBreak: 'break-word',
                                                  borderRadius: '10px',
                                                  color: '#FFFFFF',
                                                  margin: '15px 15px',
                                                  backgroundColor: '#1D1D42',
                                                  marginRight: 'auto',
                                                  boxShadow:
                                                      '-1px 1px 2px 0px #DDDDDD',
                                              }
                                    }
                                >
                                    <Text
                                        className="message_header"
                                        fontSize={'1.2em'}
                                        fontWeight={'medium'}
                                    >
                                        {message.ownedByCurrentUser
                                            ? 'me:'
                                            : 'other:'}
                                    </Text>
                                    <Text
                                        className="message_content"
                                        fontSize={'1em'}
                                    >
                                        {message.body}
                                    </Text>
                                    <Text
                                        pb={2}
                                        lineHeight={'0'}
                                        textAlign={'right'}
                                    >
                                        {today.getHours() +
                                            ':' +
                                            today.getMinutes()}
                                    </Text>
                                </li>
                            ))}
                        </ol>
                    </Box>
                    <Box>
                        <HStack
                            px={5}
                            py={4}
                            borderRadius={'10px'}
                            bg={useColorModeValue('gray.100', 'gray.600')}
                            boxShadow={'0px 3px 3px 0px #BBBBBB'}
                            h={'fit-content'}
                            maxH={'100px'}
                        >
                            <Textarea
                                className="new-message-input-field"
                                h={'min-content'}
                                minH={'30px'}
                                maxH={'80px'}
                                bg={useColorModeValue(
                                    'whiteAlpha.800',
                                    'gray.400'
                                )}
                                boxShadow={'0px 0px 2px 0px #DDDDDD'}
                                focusBorderColor={'none'}
                                border={'none'}
                                borderRadius={'full'}
                                placeholder="Write message..."
                                value={newMessage}
                                onChange={handleNewMessageChange}
                                onKeyDown={(e) =>
                                    e.code === 'Enter'
                                        ? handleSendMessage
                                        : // <></>
                                          console.log(e.code)
                                }
                            />
                            <Button
                                className="send-message-button"
                                colorScheme={'teal'}
                                px={5}
                                borderRadius={'full'}
                                onClick={handleSendMessage}
                            >
                                Send
                            </Button>
                            <Button
                                className="add-button"
                                colorScheme={'teal'}
                                bg={useColorModeValue('gray.100', 'gray.400')}
                                border={'none'}
                                borderRadius={'full'}
                                fontSize="3xl"
                                p={'0'}
                                boxShadow={'0px 0px 2px 0px #BBBBBB'}
                                // _hover={{ bg: 'red' }}
                            >
                                +
                            </Button>
                        </HStack>
                    </Box>
                </Box>
            </VStack>
            <Dock />
        </Box>
    )
}

export default ChatRoom
