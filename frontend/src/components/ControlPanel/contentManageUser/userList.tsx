import {
    Box,
    Button,
    HStack,
    Table,
    Text,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    VStack,
    Avatar,
    useColorModeValue,
} from '@chakra-ui/react'

import type { IUser } from './ManageUser'
import styles from './userList.module.css'

type Props = {
    list: IUser[]
    setViewUser: (username: string) => void
}

export function UsersList(props: Props) {
    return (
        <Table bg={useColorModeValue('white', 'gray.600')} w="100%">
            <Thead
                position="sticky"
                top={0}
                bg={useColorModeValue('white', 'gray.600')}
                zIndex={10}
            >
                <Tr>
                    <Th pl={5} fontSize={'md'} fontWeight={'bold'}>
                        User
                    </Th>
                    <Th fontSize={'md'} fontWeight={'bold'}>
                        Detail
                    </Th>
                </Tr>
            </Thead>

            <Tbody>
                {props.list.map((user: IUser, idx: number) => (
                    <Tr key={idx}>
                        <Td py="5px">
                            <HStack>
                                <Box className="friendAvatar">
                                    <Avatar
                                        size="sm"
                                        name={
                                            user.first_name +
                                            ' ' +
                                            user.last_name
                                        }
                                        src={user.profile}
                                    />
                                </Box>
                                <VStack align="left">
                                    <Text
                                        className="nickname"
                                        fontWeight="bold"
                                    >
                                        {user.first_name + ' ' + user.last_name}
                                    </Text>
                                    <Text className="username">
                                        {user.username}
                                    </Text>
                                </VStack>
                            </HStack>
                        </Td>
                        <Td py="5px">
                            <Button
                                m="1"
                                size="md"
                                onClick={() => props.setViewUser(user.username)}
                            >
                                View
                            </Button>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}
