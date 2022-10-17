import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    useColorMode,
    Button,
    LinkOverlay,
    LinkBox,
} from '@chakra-ui/react'
import {
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiMenu,
    FiBell,
    FiChevronDown,
    FiUser,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { Link as ReactRouterLink, Outlet, useNavigate } from 'react-router-dom'
import { AuthState } from '../../redux/state'
import { useSelector } from 'react-redux'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { fetchSelfUserProfile } from '../../api/user'

const { REACT_APP_API_SERVER } = process.env

interface LinkItemProps {
    name: string
    icon: IconType
    path: string
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Dashboard', icon: FiTrendingUp, path: 'dashboard' },
    { name: 'Manage User', icon: FiUser, path: 'user' },
    { name: 'Manage Forum', icon: FiStar, path: 'forum' },
    // { name: 'Manage Destination', icon: FiCompass, path: 'destination' },
]

export default function ControlPanel() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box
            w="full"
            h="auto"
            minH="100vh"
            bg={useColorModeValue('gray.100', 'gray.900')}
            m="0"
        >
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                <Outlet />
            </Box>
        </Box>
    )
}

interface SidebarProps extends BoxProps {
    onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    <Link href="/" _hover={{ textDecoration: 'none' }}>
                        Nomader
                    </Link>
                </Text>
                <CloseButton
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onClose}
                />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem
                    key={link.name}
                    icon={link.icon}
                    path={'../' + link.path}
                >
                    {link.name}
                </NavItem>
            ))}
        </Box>
    )
}

interface NavItemProps extends FlexProps {
    icon: IconType
    children: string | number
    path: string
}
const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
    return (
        <ReactRouterLink
            to={'control/' + path}
            style={{ textDecoration: 'none' }}
            // _focus={{ boxShadow: 'none' }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: '#0ABAB5',
                    color: 'white',
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </ReactRouterLink>
    )
}

interface MobileProps extends FlexProps {
    onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    const { colorMode, toggleColorMode } = useColorMode()

    const auth: AuthState = useSelector((state: any) => state.auth)

    const navigate = useNavigate()
    const [profilePic, setProfilePic] = useState<string>()

    //update username from redux
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

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
                textDecoration="none"
            >
                Nomader
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <Button variant="ghost" aria-label="open menu" px="1">
                    <FiBell />
                </Button>
                <Button variant="ghost" onClick={toggleColorMode} px="1">
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}
                        >
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={profilePic ? profilePic : ''}
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    {/* Profile Name */}
                                    <Text fontSize="md">{auth.username}</Text>
                                    {/* User Type */}
                                    <Text fontSize="s" color="gray.600">
                                        {auth.isAdmin
                                            ? 'I am Admin'
                                            : 'I am User'}
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue(
                                'gray.200',
                                'gray.700'
                            )}
                        >
                            <MenuItem>{auth.username}</MenuItem>
                            <MenuItem>
                                <Link
                                    as={ReactRouterLink}
                                    to="/profile"
                                    style={{
                                        textDecoration: 'none',
                                    }}
                                >
                                    Edit Profile
                                </Link>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem>
                                <LinkBox>
                                    <LinkOverlay
                                        onClick={logOut}
                                        style={{
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Logout
                                    </LinkOverlay>
                                </LinkBox>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    )
}
