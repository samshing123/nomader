import React from 'react'
import {
    Box,
    Heading,
    Text,
    Container,
    VStack,
    Flex,
    Table,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    Button,
    HStack,
    Circle,
} from '@chakra-ui/react'
import Nav from '../common/navBar/NavBar'
import Dock from '../common/dock/Dock'

interface IFriends {
    name: string
    username: string
    avatar: string
}

const friendsList = [
    { name: 'Adams', username: 'adamsishandsome', avatar: 'green' },
    { name: 'Jason', username: 'jasonishandsome', avatar: 'blue' },
    { name: 'Bruce', username: 'bruceishandsome', avatar: 'yellow' },
    { name: 'Lin', username: 'linisgoodlooking', avatar: 'purple' },
]

const Friends = () => {
    return (
        <Container w="full" h="full" maxW="max" p="0">
            <Flex
                w="full"
                h="full"
                direction="column"
                justify="center"
                align="center"
            >
                {/* === NavBar === */}
                <Nav />
                <Heading as="h1">Friends</Heading>
                <p></p>

                <VStack w="98vw">
                    <Text
                        fontSize="2em"
                        fontWeight="bold"
                        as={'span'}
                        position={'relative'}
                        _after={{
                            content: "''",
                            width: 'full',
                            height: '30%',
                            position: 'absolute',
                            bottom: 1,
                            left: 0,
                            bg: '#0ABAB5',
                            zIndex: -1,
                        }}
                    >
                        Friend List
                    </Text>
                    <Box
                        w="80vw"
                        maxH="30vh"
                        scrollBehavior="smooth"
                        overflowY="auto"
                    >
                        <Table
                            variant="striped"
                            colorScheme="teal"
                            w="100%"
                            // border="2px"
                            // borderColor="gray.100"
                        >
                            <Thead
                                position="sticky"
                                top={0}
                                bg="#FFFFFF"
                                zIndex={10}
                            >
                                <Tr>
                                    <Th>Info (Avater, name)</Th>
                                    <Th>Action (message, unfriend)</Th>
                                </Tr>
                            </Thead>

                            <Tbody>
                                <Tr>
                                    <Td>
                                        <HStack>
                                            <Box className="friendAvatar">
                                                <Circle size="30px" bg="pink" />
                                            </Box>
                                            <VStack align="left">
                                                <Text
                                                    className="nickname"
                                                    fontWeight="bold"
                                                >
                                                    Eric Chu
                                                </Text>
                                                <Text className="username">
                                                    ericishandsome
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </Td>
                                    <Td>
                                        <Button m="1">Message</Button>
                                        <Button m="1">Unfriend</Button>
                                    </Td>
                                </Tr>
                                {friendsList.map(
                                    (friend: IFriends, idx: number) => (
                                        <Tr key={idx}>
                                            <Td>
                                                <HStack>
                                                    <Box className="friendAvatar">
                                                        <Circle
                                                            size="30px"
                                                            bg={friend.avatar}
                                                        />
                                                    </Box>
                                                    <VStack align="left">
                                                        <Text
                                                            className="nickname"
                                                            fontWeight="bold"
                                                        >
                                                            {friend.name}
                                                        </Text>
                                                        <Text className="username">
                                                            {friend.username}
                                                        </Text>
                                                    </VStack>
                                                </HStack>
                                            </Td>
                                            <Td>
                                                <Button m="1">Message</Button>
                                                <Button m="1">Unfriend</Button>
                                            </Td>
                                        </Tr>
                                    )
                                )}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th></Th>
                                    <Th></Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </Box>
                </VStack>
                <Dock />
            </Flex>
        </Container>
    )
}

export default Friends
