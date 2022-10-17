import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Stack,
    useColorMode,
    HStack,
    Text,
    Icon,
    LinkOverlay,
    LinkBox,
} from '@chakra-ui/react'

import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons'

import { useSelector } from 'react-redux'
import { AuthState } from '../../../redux/state'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchSelfUserProfile } from '../../../api/user'

const { REACT_APP_API_SERVER } = process.env

export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode()
    const navigate = useNavigate()
    const [profilePic, setProfilePic] = useState<string>()

    //update username from redux
    const auth: AuthState = useSelector((state: any) => state.auth)

    function logOut() {
        localStorage.removeItem('auth_token')
        navigate('/welcome')
    }

    useEffect(() => {
        fetchSelfUserProfile(auth.id as any as number).then((data: any) => {
            const dataDetail = data.userDetail.rows[0]
            const profile = dataDetail.profile
            const profilePath = `${REACT_APP_API_SERVER}/profile/` + profile
            setProfilePic(profilePath)
        })
    }, [])

    var prevScrollpos = window.pageYOffset
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset
        if (prevScrollpos > currentScrollPos) {
            document.getElementById('navbar')!.style.top = '0'
        } else {
            document.getElementById('navbar')!.style.top = '-70px'
        }
        prevScrollpos = currentScrollPos
    }

    return (
        <>
            <Box
                id="navbar"
                px={4}
                w={'100vw'}
                position={'sticky'}
                top="0"
                zIndex={'1000'}
                transition={'top 1s'}
                bg={useColorModeValue('gray.100', 'gray.900')}
                border={'1px'}
                borderColor={useColorModeValue('gray.100', 'gray.900')}
                boxShadow={'0px 0px 3px 0px #DDDDDD'}
            >
                <Flex
                    h={16}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <HStack
                        paddingLeft={'4rem'}
                        w={'full'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Link to="/home" style={{ textDecoration: 'none' }}>
                            <Text
                                fontSize="2xl"
                                fontFamily="monospace"
                                fontWeight="bold"
                            >
                                Nomader
                            </Text>
                        </Link>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={0}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? (
                                    <MoonIcon />
                                ) : (
                                    <SunIcon />
                                )}
                            </Button>
                            {auth.isAuthenticated ? (
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}
                                    >
                                        <Icon
                                            as={HamburgerIcon}
                                            boxSize="1.5em"
                                        />
                                    </MenuButton>
                                    <MenuList>
                                        <Box py={1} px={2}>
                                            <HStack
                                                justifyContent={'space-around'}
                                            >
                                                <Avatar
                                                    size={'md'}
                                                    name={auth.username}
                                                    src={profilePic}
                                                />
                                                <Text
                                                    fontSize={'lg'}
                                                    fontWeight={'semibold'}
                                                    textAlign={'center'}
                                                >
                                                    {auth.username}
                                                </Text>
                                            </HStack>
                                        </Box>
                                        <LinkBox>
                                            <MenuItem>
                                                <LinkOverlay
                                                    href="/editProfile"
                                                    style={{
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    Edit Profile
                                                </LinkOverlay>
                                            </MenuItem>
                                        </LinkBox>

                                        {auth.isAdmin ? (
                                            <LinkBox>
                                                <MenuItem>
                                                    <NavLink
                                                        className="controlPanel"
                                                        to={'/control/'}
                                                    >
                                                        Control Panel
                                                    </NavLink>
                                                </MenuItem>
                                            </LinkBox>
                                        ) : (
                                            <></>
                                        )}

                                        <MenuDivider />
                                        <LinkBox>
                                            <MenuItem>
                                                <LinkOverlay
                                                    onClick={logOut}
                                                    style={{
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    Logout
                                                </LinkOverlay>
                                            </MenuItem>
                                        </LinkBox>
                                    </MenuList>
                                </Menu>
                            ) : (
                                <></>
                            )}
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}
