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
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    fetchSelfUserProfile,
    updateProfile,
    UserProfile,
} from '../../../api/user'
import { AuthState } from '../../../redux/state'
import { IUser } from './ManageUser'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'

const { REACT_APP_API_SERVER } = process.env

type Props = {
    userProfile: UserProfile
    userFriends: IUser[]
    disclosure: any
    setViewUser: (username: string) => void
}

export function ModalUserProfileDetail(props: Props) {
    const [profileList, setProfileList] = useState<UserProfile>()
    const auth: AuthState = useSelector((state: any) => state.auth)

    const userId = auth.id

    useEffect(() => {
        fetchSelfUserProfile(userId as any as number).then((data: any) => {
            const dataDetail = data.userDetail.rows[0]
            const time = dataDetail!.created_at!.slice(0, 10)
            dataDetail!.created_at = time
            const updateTime = dataDetail!.updated_at!.slice(0, 10)
            dataDetail!.updated_at = updateTime
            const job = dataDetail.title
            dataDetail!.job = job
            const profilePath =
                `${REACT_APP_API_SERVER}/profile/` + dataDetail.profile
            dataDetail.profile = profilePath
            setProfileList(dataDetail)
        })
    }, [])

    const formik = useFormik({
        initialValues: {
            username: props.userProfile?.username
                ? props.userProfile?.username
                : '',
            first_name: props.userProfile?.first_name
                ? props.userProfile?.first_name
                : '',
            last_name: props.userProfile?.last_name
                ? props.userProfile?.last_name
                : '',
            email: props.userProfile?.email ? props.userProfile?.email : '',
            phone_num: '',
            birthday: props.userProfile?.birthday
                ? props.userProfile?.birthday
                : '',
            gender: props.userProfile?.gender ? props.userProfile?.gender : '',
            information: props.userProfile?.information
                ? props.userProfile?.information
                : '',
            job: props.userProfile?.job ? props.userProfile?.job : '',
            emergency_contact_person: props.userProfile
                ?.emergency_contact_person
                ? props.userProfile?.emergency_contact_person
                : '',
            emergency_contact_num: undefined,
        },
        onSubmit: async (values: UserProfile) => {
            const res: any = await updateProfile(
                values,
                userId as any as string
            )
            if (res.success) {
                Swal.fire({
                    title: 'Success',
                    text: 'Profile Updated',
                    icon: 'success',
                })
            }
        },
    })

    // function handleImageChange(e: any) {
    //     const file = e.target.files[0]
    //     const reader = new FileReader()
    //     const url = reader.readAsDataURL(file)
    //     reader.onloadend = function (e) {
    //         setImageStore(reader.result as string)
    //         formik.setFieldValue('newProfile', file)
    //     }
    // }

    return (
        <ModalContent>
            <ModalHeader>User Profile Detail</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={formik.handleSubmit}>
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
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
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
                                        value={formik.values.first_name}
                                        onChange={formik.handleChange}
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
                                        value={formik.values.last_name}
                                        onChange={formik.handleChange}
                                    />
                                </FormControl>
                            </Box>
                        </GridItem>
                        <GridItem>
                            <Box m={1} h="min-content" w="90%">
                                <FormControl id="email">
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        placeholder="Email"
                                        _placeholder={{
                                            color: 'gray.500',
                                        }}
                                        type="text"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                    />
                                </FormControl>
                            </Box>
                        </GridItem>
                        <GridItem>
                            <Box m={1} h="min-content" w="90%">
                                <FormControl id="phone_num">
                                    <FormLabel>Phone Number</FormLabel>
                                    <Input
                                        placeholder="..."
                                        _placeholder={{
                                            color: 'gray.500',
                                        }}
                                        type="text"
                                        value={formik.values.phone_num}
                                        onChange={formik.handleChange}
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
                                        value={formik.values.birthday}
                                        onChange={formik.handleChange}
                                    />
                                </FormControl>
                            </Box>
                        </GridItem>
                        <GridItem>
                            <Box m={1} h="min-content" w="90%">
                                <FormControl id="gender">
                                    <FormLabel>Gender</FormLabel>
                                    <Input
                                        placeholder="..."
                                        _placeholder={{
                                            color: 'gray.500',
                                        }}
                                        type="text"
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
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
                                        value={formik.values.job}
                                        onChange={formik.handleChange}
                                    />
                                </FormControl>
                            </Box>
                        </GridItem>
                        <GridItem>
                            <Box m={1} h="min-content" w="90%">
                                <FormControl id="emergency_contact_person">
                                    <FormLabel>
                                        Emergency Contact Person
                                    </FormLabel>
                                    <Input
                                        placeholder="Person Name"
                                        _placeholder={{
                                            color: 'gray.500',
                                        }}
                                        type="text"
                                        value={
                                            formik.values
                                                .emergency_contact_person
                                        }
                                        onChange={formik.handleChange}
                                    />
                                </FormControl>
                            </Box>
                        </GridItem>

                        <GridItem>
                            <Box m={1} h="min-content" w="90%">
                                <FormControl id="emergency_contact_number">
                                    <FormLabel>
                                        Emergency Contact Number
                                    </FormLabel>
                                    <Input
                                        placeholder="Contact Number"
                                        _placeholder={{
                                            color: 'gray.500',
                                        }}
                                        type="text"
                                        value={
                                            formik.values.emergency_contact_num
                                        }
                                        onChange={formik.handleChange}
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
                    <Button
                        colorScheme="yellow"
                        type="submit"
                        onClick={props.disclosure.onClose}
                    >
                        Update
                    </Button>
                </ModalFooter>
            </form>
        </ModalContent>
    )
}

export function ModalUserFriends(props: Props) {
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
                                        onClick={() => {
                                            props.setViewUser(user.username)
                                            props.disclosure.onClose()
                                        }}
                                    >
                                        View
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </ModalBody>

            <ModalFooter></ModalFooter>
        </ModalContent>
    )
}
