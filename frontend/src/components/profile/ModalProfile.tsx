import {
    ModalContent,
    ModalCloseButton,
    Grid,
    GridItem,
    Input,
    ModalHeader,
    ModalBody,
    FormControl,
    FormLabel,
    ModalFooter,
    Button,
    Box,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Text,
    useColorModeValue,
    Td,
    HStack,
    Avatar,
    VStack,
} from '@chakra-ui/react'
import { UserProfile } from '../../api/user'

type Props = {
    userProfile: UserProfile
    userFriends: IUser[]
    disclosure: any
}

export interface IUser {
    first_name: string
    last_name: string
    username: string
    profile: string
}

const demoUser: UserProfile = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_num: '',
    created_at: '',
    updated_at: '',

    birthday: '',
    profile: '',
}

export function ModalPosts(props: Props) {
    return (
        <ModalContent>
            <ModalHeader>User Profile Detail</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Grid templateColumns="repeat(2, 1fr)">
                    <GridItem>
                        <Box m={1} h="min-content" w="90%">
                            <FormControl id="userName">
                                <FormLabel>User Name</FormLabel>
                                <Input
                                    placeholder="Username"
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                    type="text"
                                    value={props.userProfile.username}
                                />
                            </FormControl>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box m={1} h="min-content" w="90%">
                            <FormControl id="first_name">
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    placeholder="First Name"
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                    type="text"
                                    value={props.userProfile.first_name}
                                />
                            </FormControl>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box m={1} h="min-content" w="90%">
                            <FormControl id="last_name">
                                <FormLabel>Last Name</FormLabel>
                                <Input
                                    placeholder="Last Name"
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                    type="text"
                                    value={props.userProfile.last_name}
                                />
                            </FormControl>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box m={1} h="min-content" w="90%">
                            <FormControl id="birthday">
                                <FormLabel>Birthday</FormLabel>
                                <Input
                                    placeholder="Birthday"
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                    type="text"
                                    value={props.userProfile.birthday}
                                />
                            </FormControl>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box m={1} h="min-content" w="90%">
                            <FormControl id="gender">
                                <FormLabel>Gender</FormLabel>
                                <Input
                                    placeholder="M/F/T..."
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                    type="text"
                                    value={props.userProfile.gender}
                                />
                            </FormControl>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box m={1} h="min-content" w="90%">
                            <FormControl id="job">
                                <FormLabel>Occupation</FormLabel>
                                <Input
                                    placeholder="Job Title"
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                    type="text"
                                    value={props.userProfile.job}
                                />
                            </FormControl>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box m={1} h="min-content" w="90%">
                            <FormControl id="emergency_contact_person">
                                <FormLabel>Emergency Contact Person</FormLabel>
                                <Input
                                    placeholder="Person Name"
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                    type="text"
                                    value={
                                        props.userProfile
                                            .emergency_contact_person
                                    }
                                />
                            </FormControl>
                        </Box>
                    </GridItem>

                    <GridItem>
                        <Box m={1} h="min-content" w="90%">
                            <FormControl id="emergency_contact_number">
                                <FormLabel>Emergency Contact Number</FormLabel>
                                <Input
                                    placeholder="Contact Number"
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                    type="text"
                                    value={
                                        props.userProfile.emergency_contact_num
                                    }
                                />
                            </FormControl>
                        </Box>
                    </GridItem>
                </Grid>
            </ModalBody>

            <ModalFooter>
                <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={props.disclosure.onClose}
                >
                    Close
                </Button>
                <Button colorScheme="yellow">Update</Button>
            </ModalFooter>
        </ModalContent>
    )
}

export function ModalFriends(props: Props) {
    return (
        <ModalContent>
            <ModalHeader>User's Friends</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Table
                    variant="striped"
                    colorScheme="teal"
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
                            <Th pl={8} fontSize={'md'} fontWeight={'bold'}>
                                User
                            </Th>
                            <Th fontSize={'md'} fontWeight={'bold'}>
                                Detail
                            </Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {props.userFriends.map((user: IUser, idx: number) => (
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
                                                {user.first_name +
                                                    ' ' +
                                                    user.last_name}
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
                                        // onClick={() =>
                                        //     props.viewUser(user.username)
                                        // }
                                    >
                                        View
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </ModalBody>

            <ModalFooter>
                <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={props.disclosure.onClose}
                >
                    Close
                </Button>
                <Button colorScheme="yellow">Update</Button>
            </ModalFooter>
        </ModalContent>
    )
}
