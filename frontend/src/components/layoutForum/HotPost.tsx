import styles from './Forum.module.css'
import { Box, Image, HStack, Text, Avatar } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { fetchJson } from '../../api/utils'
import { Post } from './Forum'
import { AuthState } from '../../redux/state'
import { useSelector } from 'react-redux'
import { addBrowseCount } from '../../api/user'

const { REACT_APP_API_SERVER } = process.env

function HotPostList() {
    const [postList, setPostList] = useState<Array<Post>>([])
    const auth: AuthState = useSelector((state: any) => state.auth)

    useEffect(() => {
        fetchJson<Array<Post>>(`${REACT_APP_API_SERVER}/data/hotPost`).then(
            (data) => {
                console.log('check2', data)
                setPostList(
                    data.map((item) => ({
                        ...item,
                    }))
                )
            }
        )
    }, [])

    postList.forEach((post: Post) => {
        const time = post.created_at!.slice(0, 10)
        post.created_at = time
        const fileName = post.image
        let path = `${REACT_APP_API_SERVER}/post/` + fileName
        post.image = path
        const profileFileName = post.profile
        let profilePath = `${REACT_APP_API_SERVER}/profile/` + profileFileName
        post.profile = profilePath
        const id = post.id
    })

    function browseCount(post_id: number) {
        const user_id = auth.id
        addBrowseCount(post_id, user_id as any as number)
    }

    return (
        <>
            {postList.map((post) => (
                <Box p={2} display={{ md: 'flex' }} key={post.id}>
                    <Box flexShrink={0}>
                        <div>
                            <div>
                                <img
                                    src={require(`../../assets/successBackground.jpg`)}
                                    alt="interest"
                                ></img>
                            </div>
                        </div>
                    </Box>
                    <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                        <HStack>
                            <Text
                                fontWeight="bold"
                                textTransform="uppercase"
                                fontSize="lg"
                                letterSpacing="wide"
                                color="teal.600"
                            >
                                {post.title}
                            </Text>
                        </HStack>
                        <Box className={styles.infoBox}>
                            <div className={styles.usernameBox}>
                                <Avatar
                                    name={post.username}
                                    src={post.profile}
                                    className={styles.profile}
                                />
                                <p>{post.username}</p>
                            </div>
                            <div className={styles.dateBox}>
                                {post.created_at}
                            </div>
                        </Box>
                        <details>
                            <summary
                                onClick={() =>
                                    browseCount(post.id as any as number)
                                }
                            >
                                Read more
                            </summary>
                            <Box className={styles.contentBox}>
                                <Text className={styles.content}>
                                    {post.content}
                                </Text>
                            </Box>
                        </details>
                    </Box>
                </Box>
            ))}
        </>
    )
}

export default HotPostList
