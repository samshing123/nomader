import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Icon } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchSelfUserProfile } from '../../api/user'
import { AuthState } from '../../redux/state'
import Dock from '../common/dock/Dock'
import styles from './Matching.module.css'

const { REACT_APP_API_SERVER } = process.env

function MatchingSuccess() {
    const navigate = useNavigate()
    const [profilePic, setProfilePic] = useState<string>()
    const auth: AuthState = useSelector((state: any) => state.auth)

    function goBack() {
        navigate('/matching')
    }

    useEffect(() => {
        fetchSelfUserProfile(auth.id as any as number).then((data: any) => {
            const dataDetail = data.userDetail.rows[0]
            const profile = dataDetail.profile
            const profilePath = `${REACT_APP_API_SERVER}/profile/` + profile
            setProfilePic(profilePath)
        })
    }, [])

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.tab}>
                    <button className={styles.backwardBtn} onClick={goBack}>
                        <Icon as={ChevronLeftIcon} w={12} h={12} />
                    </button>
                    <div className={styles.titleBox}>
                        <h1 className={styles.bigTitle}>Match!</h1>
                    </div>
                </div>
                <Box
                    maxW="sm"
                    borderWidth="3px"
                    borderRadius="xl"
                    overflow="hidden"
                    margin={10}
                    padding={10}
                    display="flex"
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Avatar className={styles.avatar} size="xl"></Avatar>
                    <div className={styles.flexContainer}>
                        <h1 className={styles.caption}>
                            Enjoy <br></br>your journey!
                        </h1>
                    </div>
                    <Avatar className={styles.avatar} size="xl"></Avatar>
                    <Button
                        bgImage={
                            'linear-gradient(to right,#67d6f8, #67d6f8, #bae4c7)'
                        }
                        className={styles.btn}
                        type="submit"
                    >
                        Chat Now
                    </Button>
                </Box>
            </div>
            <Dock />
        </div>
    )
}

export default MatchingSuccess
