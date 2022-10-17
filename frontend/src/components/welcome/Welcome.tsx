import styles from './Welcome.module.css'
import { Button, Flex } from '@chakra-ui/react'
import Dock from '../common/dock/Dock'
import { useNavigate } from 'react-router'

function Welcome() {
    const navigate = useNavigate()

    function logIn() {
        navigate('/login')
    }

    function signUp() {
        navigate('/signUp')
    }
    return (
        <>
            <Flex
                w="full"
                h="100vh"
                direction="column"
                justify="center"
                align="center"
                backgroundImage="temp/welcomeBackground.jpg"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
            >
                <div className={styles.welcomeBox}>
                    <div className={styles.hexagon}>
                        <h2 className={styles.header}>Welcome</h2>
                        <Button
                            as="a"
                            className={styles.button}
                            backgroundColor="#FFFFFF50"
                            onClick={logIn}
                        >
                            Login
                        </Button>
                        <Button
                            as="a"
                            className={styles.button}
                            backgroundColor="#FFFFFF50"
                            onClick={signUp}
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>
            </Flex>
        </>
    )
}

export default Welcome
