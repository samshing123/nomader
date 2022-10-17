import React, { useEffect, useState } from 'react'
import styles from './Profile.module.css'
import {
    Box,
    Text,
    VStack,
    Flex,
    Stack,
    Avatar,
    Button,
    useColorModeValue,
    Modal,
    ModalOverlay,
    useDisclosure,
    Stat,
    StatLabel,
    StatNumber,
    StatGroup,
} from '@chakra-ui/react'
import Nav from '../common/navBar/NavBar'
import Dock from '../common/dock/Dock'
import { useFormik } from 'formik'
import {
    fetchSelfUserProfile,
    getUserFriendsWithInfo,
    getUserProfile,
    updateProfile,
    UserProfile,
} from '../../api/user'
import { AuthState } from '../../redux/state'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { ModalFriends, ModalPosts } from './ModalProfile'
import { Link } from 'react-router-dom'

const { REACT_APP_API_SERVER } = process.env

const Profile = () => {
    const [imageStore, setImageStore] = useState('')

    // show existing info
    const [profileList, setProfileList] = useState<UserProfile>()
    const auth: AuthState = useSelector((state: any) => state.auth)

    const userId = auth.id

    const [userProfile, setUserProfile] = React.useState<UserProfile>({})

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
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            email: '',
            phone_num: '',
            birthday: '',
            gender: '',
            information: '',
            profile: new File([''], ''),
            newProfile: new File([''], ''),
            job: '',
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

    function handleImageChange(e: any) {
        const file = e.target.files[0]
        const reader = new FileReader()
        const url = reader.readAsDataURL(file)
        reader.onloadend = function (e) {
            setImageStore(reader.result as string)
            formik.setFieldValue('newProfile', file)
        }
    }

    useEffect(() => {
        const result = getUserProfile(auth.username as string).then((data) => {
            console.log('View user data = ', data)
            if (data.success) {
                console.log('<getUserProfile> Fetch Success')
                setUserProfile(data.userProfile)
            } else {
                console.log('<getUserProfile> Fetch Fail')
            }
        })
    }, [])

    // Modal popup for showing user profile detail and friends
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modalType, setModalType] = useState<string>('')

    const [userFriends, setUserFriends] = useState<Array<any>>([])
    const [friendsCount, setFriendsCount] = useState<any>('')

    const [userPosts, setUserPosts] = useState<Array<any>>([])

    useEffect(() => {
        const result = getUserFriendsWithInfo(auth.id as number).then(
            (data) => {
                console.log('View user friends with Info = ', data)
                if (data.success) {
                    console.log('<getUserFriendsWithInfo> Fetch Success')
                } else {
                    console.log('<getUserFriendsWithInfo> Fetch Fail')
                }
                setUserFriends(data.userFriends)
                setFriendsCount(data.userFriends.length)
            }
        )
    }, [])

    console.log(`Friends Count = ${friendsCount}`)

    return (
        <div>
            <Box w="auto" h="full">
                {/* === NavBar === */}
                <Nav />
                <VStack w="auto">
                    <Text
                        position={'relative'}
                        className={styles.bigTitle}
                        color={useColorModeValue('#1d1d42', '#B0D8BC')}
                    >
                        Profile
                    </Text>
                    <Flex minH={'full'} align={'center'} justify={'center'}>
                        <Stack>
                            <Stack
                                direction={['column', 'row']}
                                spacing={3}
                                justifyContent="center"
                                alignItems={'center'}
                            >
                                <div className={styles.profileContainer}>
                                    {imageStore === '' ? (
                                        <Avatar
                                            name={profileList?.username}
                                            size="2xl"
                                            src={
                                                profileList?.profile as any as string
                                            }
                                        ></Avatar>
                                    ) : (
                                        <Avatar
                                            size="2xl"
                                            src={imageStore}
                                        ></Avatar>
                                    )}
                                </div>

                                <Stack
                                    w="100%"
                                    p={3}
                                    wrap="wrap"
                                    direction={{
                                        base: 'column',
                                        sm: 'column',
                                        md: 'column',
                                        lg: 'row',
                                        xl: 'row',
                                    }}
                                    justify="space-evenly"
                                    alignItems={'center'}
                                    spacing={2}
                                >
                                    <Text
                                        as="h3"
                                        fontSize={'2xl'}
                                        fontWeight={'semibold'}
                                        color={useColorModeValue(
                                            '#1d1d42',
                                            '#B0D8BC'
                                        )}
                                    >
                                        {profileList?.first_name +
                                            ' ' +
                                            profileList?.last_name}
                                    </Text>
                                    <Button
                                        size={'xs'}
                                        colorScheme="gray"
                                        boxShadow={'0px 1px 2px #BBBBBB'}
                                    >
                                        <Link to="/editProfile">
                                            Edit Profile
                                        </Link>
                                    </Button>
                                </Stack>
                            </Stack>

                            <Stack
                                w={'100%'}
                                p={2}
                                direction={['column', 'row']}
                                justifyContent="center"
                                alignItems="center"
                                spacing={5}
                            >
                                <StatGroup>
                                    <Stat p={1} m={2}>
                                        <StatLabel>Friends</StatLabel>
                                        <StatNumber>{friendsCount}</StatNumber>
                                    </Stat>
                                    <Stat p={1} m={2}>
                                        <StatLabel>Posts</StatLabel>
                                        <StatNumber>{friendsCount}</StatNumber>
                                    </Stat>
                                </StatGroup>
                                <Button
                                    size={'lg'}
                                    bgImage={
                                        'linear-gradient(to right,#569ee6, #67d6f8, #b0d8bc)'
                                    }
                                    boxShadow={'0px 1px 2px #BBBBBB'}
                                    type="submit"
                                    className={styles.btn}
                                    onClick={() => {
                                        setModalType('friends')
                                        onOpen()
                                    }}
                                >
                                    View Friends
                                </Button>
                                <Button
                                    size={'lg'}
                                    bgImage={
                                        'linear-gradient(to right,#569ee6, #67d6f8, #b0d8bc)'
                                    }
                                    boxShadow={'0px 1px 2px #BBBBBB'}
                                    type="submit"
                                    className={styles.btn}
                                    onClick={() => {
                                        setModalType('posts')
                                        onOpen()
                                    }}
                                >
                                    View Posts
                                </Button>
                            </Stack>
                            <Stack
                                my="3px"
                                p="3px"
                                spacing={4}
                                direction={['column', 'row']}
                            >
                                <Modal
                                    id="modal_Profile"
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    size={{ base: 'sm', md: 'lg', lg: 'xl' }}
                                >
                                    <ModalOverlay />
                                    {modalType === 'friends' ? (
                                        <ModalFriends
                                            userProfile={userProfile}
                                            userFriends={userFriends}
                                            disclosure={{
                                                onOpen,
                                                isOpen,
                                                onClose,
                                            }}
                                        />
                                    ) : (
                                        <ModalPosts
                                            userProfile={userProfile}
                                            userFriends={userFriends}
                                            disclosure={{
                                                onOpen,
                                                isOpen,
                                                onClose,
                                            }}
                                        />
                                    )}
                                </Modal>
                            </Stack>
                            <Box
                                fontSize="sm"
                                color={useColorModeValue('#1d1d42', '#B0D8BC')}
                                className={styles.timeBox}
                            >
                                <Text fontSize={'1em'}>
                                    Member since: {profileList?.created_at}
                                </Text>
                                <Text>
                                    Last update: {profileList?.updated_at}
                                </Text>
                            </Box>
                        </Stack>
                    </Flex>
                </VStack>
                <Dock />
            </Box>
        </div>
    )
}

export default Profile
