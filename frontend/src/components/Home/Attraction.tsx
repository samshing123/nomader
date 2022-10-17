import {
    Box,
    Flex,
    FormControl,
    HStack,
    Icon,
    Image,
    Input,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { fetchJson } from '../../api/utils'
import Nav from '../common/navBar/NavBar'
import Dock from '../common/dock/Dock'
import { useNavigate } from 'react-router'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { MdSearch } from 'react-icons/md'
import styles from './Attraction.module.css'

const { REACT_APP_API_SERVER } = process.env

export interface AttractionPost {
    id: number
    name: string
    description: string
    image?: string
    imageLink?: string
    address: string
    open_time: string
    city_list: string
}

function Attraction() {
    const [postList, setPostList] = useState<Array<AttractionPost>>([])
    const [searchPostList, setSearchPostList] = useState<Array<AttractionPost>>(
        []
    )

    const navigate = useNavigate()

    useEffect(() => {
        fetchJson<Array<AttractionPost>>(
            `${REACT_APP_API_SERVER}/data/attraction`
        ).then((data) => {
            setPostList(
                data.map((item) => ({
                    ...item,
                }))
            )
            setSearchPostList(
                data.map((item) => ({
                    ...item,
                }))
            )
            console.log('Fetch Data = ', data)
        })
    }, [])

    postList.forEach((post: AttractionPost) => {
        const imageLink = post.image?.replace('url(', '')
        let lastIndex = imageLink?.lastIndexOf('"')
        let newLink = imageLink?.substring(0, lastIndex).substring(1)
        post.image = newLink
    })

    const [searchPost, setSearchPost] = useState('')
    const handleChange_searchPost = (event: any) =>
        setSearchPost(event.target.value)
    const searchRef = useRef(searchPost)

    useEffect(() => {
        if (searchPost !== searchRef.current) {
            console.log('<Search User> searchUser = ', searchPost)
            const result = searchPostList!.filter(
                (item) =>
                    item.name.match(searchPost) ||
                    item.description.match(searchPost)
            )
            const postListData = result.map((item: any) => ({
                ...item,
            }))
            // console.log('<Search User> userListData = ', postListData)
            setPostList(postListData)
        }
    }, [searchPost])

    function PostCards(post: any) {
        return (
            <Box
                px={5}
                py={3}
                display={{ md: 'flex' }}
                key={post.id}
                marginBottom={1}
            >
                <Box flexShrink={0}>
                    <div>
                        <Image
                            borderRadius="lg"
                            w={{
                                md: '150px',
                                lg: '200px',
                            }}
                            src={post.image}
                        />
                    </div>
                </Box>
                <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                    <HStack>
                        <Text
                            fontWeight="bold"
                            textTransform="uppercase"
                            fontSize="xl"
                            letterSpacing="wide"
                            // color="teal.600"
                            color={useColorModeValue('#1d1d42', '#B0D8BC')}
                        >
                            {post.name}
                        </Text>
                    </HStack>
                    <Text
                        className={styles.cityList}
                        fontWeight="bold"
                        textTransform="uppercase"
                        fontSize="xl"
                        letterSpacing="wide"
                        color="#2d4b6fca"
                    >
                        {post.city_list}
                    </Text>
                    <Box className={styles.infoBox}>
                        <Text className={styles.content}>
                            {post.description}
                        </Text>
                    </Box>
                </Box>
            </Box>
        )
    }

    function goBack() {
        navigate('/home')
    }

    return (
        <>
            <div>
                <Nav />
                <div className={styles.tab}>
                    <button className={styles.backwardBtn} onClick={goBack}>
                        <Icon
                            as={ChevronLeftIcon}
                            w={12}
                            h={12}
                            color={useColorModeValue('#1d1d42', '#B0D8BC')}
                        />
                    </button>
                    <div className={styles.titleBox}>
                        <Text
                            as="h1"
                            className={styles.headTitle}
                            color={useColorModeValue('#1d1d42', '#B0D8BC')}
                        >
                            Attraction
                        </Text>
                    </div>
                </div>
                <hr className={styles.line} />
                <VStack justifyContent={'center'}>
                    <Box
                        className="searchUser"
                        w="90%"
                        maxW={'xl'}
                        m={3}
                        px="5px"
                        bg="gray.200"
                        rounded={'15px'}
                        boxShadow={'lg'}
                    >
                        <HStack>
                            <FormControl id="searchUser">
                                <Input
                                    placeholder="Search attraction"
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                    border="0"
                                    type="text"
                                    onChange={handleChange_searchPost}
                                    value={searchPost}
                                    focusBorderColor={'none'}
                                />
                            </FormControl>
                            <Icon as={MdSearch} h="30px" w="30px" />
                        </HStack>
                    </Box>
                    <Box className={styles.postContainer} p={3}>
                        {postList.map((post, idx) => (
                            // <PostCards post={post} key={idx} />

                            <Box
                                px={5}
                                py={3}
                                display={{ md: 'flex' }}
                                key={post.id}
                                marginBottom={1}
                            >
                                <Box flexShrink={0}>
                                    <div>
                                        <Image
                                            borderRadius="lg"
                                            w={{
                                                md: '150px',
                                                lg: '200px',
                                            }}
                                            src={post.image}
                                        />
                                    </div>
                                </Box>
                                <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                                    <HStack>
                                        <Text
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            fontSize="xl"
                                            letterSpacing="wide"
                                            color="teal.600"
                                            // color={useColorModeValue('#1d1d42', '#B0D8BC')}
                                        >
                                            {post.name}
                                        </Text>
                                    </HStack>
                                    <Text
                                        className={styles.cityList}
                                        fontWeight="medium"
                                        fontSize="lg"
                                        color="#2d4b6fca"
                                    >
                                        {post.city_list}
                                    </Text>
                                    <Box className={styles.infoBox}>
                                        <Text className={styles.content}>
                                            {post.description}
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </VStack>
                <Dock />
            </div>
        </>
    )
}

export default Attraction
