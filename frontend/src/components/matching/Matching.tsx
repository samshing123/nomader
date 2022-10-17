import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
    BsFillPencilFill,
    BsFillPersonBadgeFill,
    BsFillPersonFill,
    BsHouseDoorFill,
} from 'react-icons/bs'
import {
    Box,
    Button,
    Center,
    Icon,
    Image,
    Wrap,
    WrapItem,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
    fetchOtherUserProfile,
    likedUserAction,
    openChat,
    unlikedUserAction,
} from '../../api/friend'

import type { OtherUserProfile } from '../../api/friend'

import { AuthState } from '../../redux/state'
import Dock from '../common/dock/Dock'
import styles from './Matching.module.css'
// import MatchingSuccess from './MatchingSuccess'
import Nav from '../common/navBar/NavBar'

const { REACT_APP_API_SERVER } = process.env

function Matching() {
    const auth: AuthState = useSelector((state: any) => state.auth)
    const [profileList, setProfileList] = useState<[OtherUserProfile]>()
    const [profile, setProfile] = useState<OtherUserProfile>()
    const [likedUser, setLikedUser] = useState(2)
    const [likedUserId, setLikedUserId] = useState<number[]>()
    const [profileDefault, setProfileDefault] = useState(true)
    const navigate = useNavigate()

    const userId = auth.id

    console.log(profileList)
    useEffect(() => {
        try {
            fetchOtherUserProfile(userId as any as number).then((data: any) => {
                const userList = data.message.user
                console.log('check', userList)
                setLikedUser(data.message.waitMatchNum)
                setProfileList(
                    userList.map((user: OtherUserProfile) => ({
                        ...user,
                    }))
                )
                console.log('check', profileList)
                setProfile(userList[0])
                let likedUserIdList: number[] = []
                if (likedUser === 2) {
                    likedUserIdList.push(userList[0].id)
                    likedUserIdList.push(userList[1].id)
                    setLikedUserId(likedUserIdList)
                } else if (likedUser === 1) {
                    likedUserIdList.push(userList[0].id)
                    setLikedUserId(likedUserIdList)
                } else {
                    return
                }
            })
        } catch (err) {
            window.location.reload()
        }
    }, [])

    profileList?.forEach((user: OtherUserProfile) => {
        const interestList = user.interests
        console.log(interestList)
        for (let i = 0; i < interestList.length; i++) {
            interestList[i] = interestList[i].replace(/\s+/g, '')
        }
        if (user.profile === '') {
            return
        } else {
            const fileName = user.profile
            let path = `${REACT_APP_API_SERVER}/profile/` + fileName
            user.profile = path
        }

        if (user.gender === 'Female') {
            setProfileDefault(true)
        } else {
            setProfileDefault(false)
        }
    })

    function unliked() {
        unlikedUserAction(userId!, profile!.id).then((data: any) => {
            console.log(data)
        })
        if (profileList!.length === 1) {
            Swal.fire({
                title: 'Oops...',
                text: `Don't be greedy. You can only read 5 profiles each time`,
                icon: 'warning',
            })
            navigate('/home')
        }
        profileList!.shift()
        setProfile(profileList![0])
        setProfileDefault(!profileDefault)
    }

    function liked() {
        likedUserAction(userId!, profile!.id).then((data: any) => {
            console.log(data)
        })
        console.log(userId, profile?.id)
        if (profileList!.length === 1) {
            Swal.fire({
                title: 'Oops...',
                text: `Don't be greedy. You can only read 5 profiles each time`,
                icon: 'warning',
            })
            navigate('/home')
        }
        if (likedUser === 2 || likedUser === 1) {
            likedUserId?.forEach((id) => {
                if (id === profile?.id) {
                    openChat(userId!, profile.id).then((data) => {
                        console.log('chat', data)
                    })
                    Swal.fire({
                        title: 'Match!',
                        text: `Please go to chat room now!`,
                        icon: 'success',
                    })
                }
            })
            profileList!.shift()
            setProfile(profileList![0])
            setProfileDefault(!profileDefault)
        } else {
            profileList!.shift()
            setProfile(profileList![0])
            setProfileDefault(!profileDefault)
        }
    }

    return (
        <>
            <Nav />
            <div className={styles.profileContainer}>
                <div className={styles.flexContainer}>
                    {profileDefault ? (
                        <img
                            src={require(`../../assets/profile2.jpg`)}
                            alt="profile pic"
                            className={styles.profilePic}
                        ></img>
                    ) : (
                        <img
                            src={require(`../../assets/profile.1.jpg`)}
                            alt="profile pic"
                            className={styles.profilePic}
                        ></img>
                    )}
                </div>
                <div className={styles.profileInfo}>
                    <div className={styles.infoBox}>
                        <BsFillPersonFill className={styles.icon} />
                        <h1 className={styles.title}>{profile?.username}</h1>
                    </div>
                    <div className={styles.infoBox}>
                        <BsHouseDoorFill className={styles.icon} />
                        <h2 className={styles.subtitle}> {profile?.country}</h2>
                    </div>
                    <div className={styles.infoBox}>
                        <BsFillPersonBadgeFill className={styles.icon} />
                        <h2 className={styles.subtitle}>{profile?.jobTitle}</h2>
                    </div>
                    <hr></hr>

                    <h3 className={styles.bio}> {profile?.information}</h3>

                    <hr></hr>

                    <h3 className={styles.subtitle}> Interests </h3>
                    <div className={styles.interestBox}>
                        <Wrap spacingX={2}>
                            {profile?.interests.map((interest) => (
                                <WrapItem key={interest}>
                                    <Center w="80px" h="80px" overflow="hidden">
                                        <img
                                            src={require(`../../assets/interests/${interest}.png`)}
                                            alt="interest"
                                        ></img>
                                    </Center>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </div>
                </div>
                <Box className={styles.btnBox}>
                    <Button
                        className={styles.crossbtn}
                        onClick={unliked}
                        borderRadius="full"
                        bgImage={'linear-gradient(to right,#569ee6,  #b0d8bc)'}
                        boxSize={'4em'}
                    >
                        <Icon as={CloseIcon} boxSize={'1.5em'} />
                    </Button>
                    <Button
                        className={styles.tickbtn}
                        onClick={liked}
                        borderRadius="full"
                        bgImage={
                            'linear-gradient(to right,#569ee6, #67d6f8, #b0d8bc)'
                        }
                        boxSize={'4em'}
                    >
                        <Icon as={CheckIcon} boxSize={'2em'} />
                    </Button>
                </Box>
                <Dock />
            </div>
        </>
    )
}

export default Matching
