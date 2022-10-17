import {
    Box,
    HStack,
    VStack,
    Flex,
    useColorModeValue,
    Icon,
} from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'
import {
    MdOutlineChat,
    MdOutlineForum,
    MdOutlineHome,
    MdOutlinePeople,
    MdOutlinePerson,
} from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import './Dock.css'

interface Action {
    name: string
    path: string
    icon: IconType
}

function Dock() {
    const actions: Action[] = [
        { name: 'Home', path: '/home', icon: MdOutlineHome },
        { name: 'Forum', path: '/forum', icon: MdOutlineForum },
        { name: 'Matching', path: '/matchingIndex', icon: MdOutlinePeople },
        { name: 'Chat', path: '/chat', icon: MdOutlineChat },
        { name: 'Profile', path: '/profile', icon: MdOutlinePerson },
    ]

    return (
        <Box w="auto" h="80px">
            <HStack
                w="100%"
                h="70px"
                px={4}
                align="center"
                justifyContent="space-around"
                position="fixed"
                bottom="0"
                bg={useColorModeValue('gray.100', 'gray.900')}
                borderTopRadius="10px"
                boxShadow="0px 0px 20px #B0D8BC80"
                zIndex={9999}
            >
                {actions.map((action: Action, idx: number) => (
                    <Flex
                        key={idx}
                        h="40px"
                        w="50px"
                        _hover={{
                            textDecoration: 'none',
                            color: '#FFFFFF',
                        }}
                        justify="center"
                        align="flex-start"
                    >
                        <NavLink
                            to={action.path}
                            className={({ isActive }) =>
                                isActive ? 'active' : undefined
                            }
                            style={({ isActive }) =>
                                isActive
                                    ? {
                                          color: '#393939',
                                      }
                                    : { color: '#CCCCCC' }
                            }
                        >
                            <VStack justify="center" align="center">
                                <Icon as={action.icon} h="35px" w="35px" />
                                <Box className="bar"></Box>
                            </VStack>
                        </NavLink>
                    </Flex>
                ))}
            </HStack>
        </Box>
    )
}

export default Dock
