import {
    Avatar,
    Box,
    HStack,
    Text,
    LinkBox,
    Stack,
    Td,
    Tr,
    LinkOverlay,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

type Props = {
    chatRoomList: any[]
}

export default function ChatList(props: Props) {
    return (
        <>
            {props.chatRoomList.map((room: any, idx: number) => (
                <Tr key={idx} boxShadow={'0px 0px 1px'}>
                    <Td py={3}>
                        <LinkBox>
                            <HStack w="full">
                                <Box className="friendAvatar">
                                    <Avatar
                                        size={{
                                            base: 'md',
                                            lg: 'lg',
                                        }}
                                        name={room.username}
                                        src={room.profile}
                                    />
                                </Box>
                                <Stack
                                    w={'full'}
                                    px={2}
                                    justifyContent="space-around"
                                    direction={{
                                        base: 'column',
                                        lg: 'row',
                                    }}
                                >
                                    <Text
                                        w={{
                                            base: 'auto',
                                            lg: '30%',
                                        }}
                                        className="nickname"
                                        fontSize={'lg'}
                                        fontWeight="bold"
                                    >
                                        {room.username}
                                    </Text>
                                    <Text
                                        w={{
                                            base: 'auto',
                                            lg: '70%',
                                        }}
                                        className="last_message"
                                        fontSize={{
                                            base: 'md',
                                            lg: 'lg',
                                        }}
                                        whiteSpace={'nowrap'}
                                        overflow="hidden"
                                    >
                                        {room?.lastMessage}
                                    </Text>
                                </Stack>
                                <Text
                                    className="last_message_time"
                                    fontSize={'lg'}
                                    fontWeight={'medium'}
                                >
                                    {Date.parse(
                                        room?.room_updated_at as string
                                    ) < Date.now() &&
                                    room?.room_updated_at !== undefined
                                        ? room?.room_updated_at
                                              .split('T', 2)[1]
                                              .split('.', 1)[0]
                                              .split(':', 2)
                                              .join(':')
                                        : room?.room_updated_at.split('T', 1)}
                                </Text>
                                <LinkOverlay
                                    as={Link}
                                    to={`/chat/${room.room_title}`}
                                ></LinkOverlay>
                            </HStack>
                        </LinkBox>
                    </Td>
                </Tr>
            ))}
        </>
    )
}
