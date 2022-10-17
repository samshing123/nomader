import React, { useEffect, useRef, useState } from 'react'
import styles from './Forum.module.css'
import {
    Box,
    Heading,
    Link,
    Image,
    Text,
    HStack,
    Tag,
    SpaceProps,
    useColorModeValue,
    VStack,
    Flex,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Icon,
    Button,
    FormControl,
    Input,
} from '@chakra-ui/react'
import Nav from '../common/navBar/NavBar'
import Dock from '../common/dock/Dock'
import { AddIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router'
import PostList from './LastestPostList'
import HotPostList from './HotPost'
import { MdSearch } from 'react-icons/md'

const { REACT_APP_API_SERVER } = process.env

export interface Post {
    id?: number
    title: string
    content: string
    category?: string
    username?: string
    created_at?: string
    profile?: string
    image?: string
}

const Forum = () => {
    const navigate = useNavigate()

    return (
        <div>
            {/* === NavBar === */}
            <Nav />
            <VStack w="auto" margin={6}>
                <div className={styles.head}>
                    <Text
                        as="h1"
                        className={styles.headTitle}
                        color={useColorModeValue('#1d1d42', '#B0D8BC')}
                    >
                        Nomad Blog
                    </Text>
                    <Box className={styles.btnBox}>
                        <Button
                            className={styles.addbtn}
                            bgImage={
                                'linear-gradient(to right,#569ee6, #67d6f8, #b0d8bc)'
                            }
                            onClick={() => {
                                navigate('/newPost')
                            }}
                        >
                            <Icon as={AddIcon} w={6} h={6} />
                        </Button>
                    </Box>
                </div>
                <VStack w="auto">
                    <Tabs isFitted>
                        <TabList>
                            <Tab>Hot</Tab>
                            <Tab>Latest</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <VStack
                                    w={{ base: '90vw', lg: '85vw', xl: '75vw' }}
                                    paddingTop="20px"
                                    spacing="2"
                                    alignItems="flex-start"
                                >
                                    <HotPostList />
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <VStack
                                    w={{ base: '90vw', lg: '85vw', xl: '75vw' }}
                                    paddingTop="20px"
                                    spacing="2"
                                    alignItems="flex-start"
                                >
                                    <PostList />
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </VStack>
            </VStack>
            <Dock />
        </div>
    )
}

export default Forum
