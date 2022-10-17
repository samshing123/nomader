import {
    Box,
    chakra,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Button,
    VStack,
    StatHelpText,
    StatArrow,
    HStack,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import {
    MdAttractions,
    MdFactCheck,
    MdOutlineTimer,
    MdPerson,
    MdPersonAdd,
    MdTimelapse,
} from 'react-icons/md'

interface StatsCardProps {
    title: string
    stat: string
    icon: ReactNode
}
function StatsCard(props: StatsCardProps) {
    const { title, stat, icon } = props
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            // border={'1px solid'}
            // borderColor={useColorModeValue('gray.800', 'gray.500')}
            bg="#FFFFFF"
            rounded={'lg'}
        >
            <VStack h="full" justifyContent={'center'} alignItems={'center'}>
                <Flex justifyContent={'space-between'}>
                    <Box pl={{ base: 2, md: 4 }}>
                        <StatLabel fontSize={'lg'} fontWeight={'medium'}>
                            {title}
                        </StatLabel>
                        <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                            {stat}
                        </StatNumber>
                    </Box>
                    <Box
                        my={'auto'}
                        color={useColorModeValue('gray.800', 'gray.200')}
                        alignContent={'center'}
                    >
                        {icon}
                    </Box>
                </Flex>
                <HStack
                    w="full"
                    justifyContent={{ base: 'center', sm: 'space-evenly' }}
                >
                    <Button
                        size={{ base: 'sm', md: 'xs', lg: 'md' }}
                        colorScheme={'teal'}
                    >
                        Day
                    </Button>
                    <Button
                        size={{ base: 'sm', md: 'xs', lg: 'md' }}
                        colorScheme={'teal'}
                    >
                        Week
                    </Button>
                    <Button
                        size={{ base: 'sm', md: 'xs', lg: 'md' }}
                        colorScheme={'teal'}
                    >
                        Month
                    </Button>
                </HStack>
            </VStack>
        </Stat>
    )
}

function ActiveStatsCard(props: StatsCardProps) {
    const { title, stat, icon } = props
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            // border={'1px solid'}
            // borderColor={useColorModeValue('gray.800', 'gray.500')}
            bg="#FFFFFF"
            rounded={'lg'}
        >
            <VStack h="full" justifyContent={'center'} alignItems={'center'}>
                <Flex justifyContent={'space-between'}>
                    <Box pl={{ base: 2, md: 4 }}>
                        <StatLabel fontSize={'lg'} fontWeight={'medium'}>
                            {title}
                        </StatLabel>
                        <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                            {stat}
                        </StatNumber>
                    </Box>
                    <Box
                        my={'auto'}
                        color={useColorModeValue('gray.800', 'gray.200')}
                        alignContent={'center'}
                    >
                        {icon}
                    </Box>
                </Flex>
                <HStack
                    w="full"
                    justifyContent={{ base: 'center', sm: 'space-evenly' }}
                >
                    <Button
                        size={{ base: 'sm', md: 'xs', lg: 'md' }}
                        colorScheme={'cyan'}
                    >
                        Day
                    </Button>
                    <Button
                        size={{ base: 'sm', md: 'xs', lg: 'md' }}
                        colorScheme={'cyan'}
                    >
                        Week
                    </Button>
                    <Button
                        size={{ base: 'sm', md: 'xs', lg: 'md' }}
                        colorScheme={'cyan'}
                    >
                        Month
                    </Button>
                </HStack>
            </VStack>
        </Stat>
    )
}

export default function Dashboard() {
    return (
        <Box maxW="7xl" px={{ base: 0 }}>
            {/* <chakra.h1
                textAlign={'center'}
                fontSize={'4xl'}
                py={1}
                fontWeight={'bold'}
            >
                Data Dashboard
            </chakra.h1> */}
            <Box w={'100vw'} h={'100vh'}>
                <iframe
                    title="charts"
                    width={`${window.innerWidth * 0.85}`}
                    height={`${window.innerHeight * 0.85}`}
                    src="https://datastudio.google.com/embed/reporting/a09d7e5e-8f21-4da7-8f44-fdc08b7deff3/page/p_3vlkq3a2yc"
                    frameBorder="0"
                    // style="border:0"
                    // allowfullscreen
                ></iframe>
            </Box>

            {/* <SimpleGrid
                columns={{ base: 1, md: 3 }}
                spacing={{ base: 5, lg: 8 }}
            >
                <StatsCard
                    title={'Total Number of Users'}
                    stat={'5,000'}
                    icon={<MdPersonAdd size={'2.5em'} />}
                />

                <StatsCard
                    title={'Total Number of Match'}
                    stat={'1,000'}
                    icon={<MdFactCheck size={'2.5em'} />}
                />
                <StatsCard
                    title={'Total Number of Post'}
                    stat={'125'}
                    icon={<MdAttractions size={'2.5em'} />}
                />
                <ActiveStatsCard
                    title={'Active User'}
                    stat={'1000'}
                    icon={<MdPerson size={'2.5em'} />}
                />
                <ActiveStatsCard
                    title={'Active Time Period'}
                    stat={'6pm~7pm'}
                    icon={<MdTimelapse size={'2.5em'} />}
                />
                <ActiveStatsCard
                    title={'Active Duration'}
                    stat={'20 minutes'}
                    icon={<MdOutlineTimer size={'2.5em'} />}
                />
            </SimpleGrid>

            <Container py={5} maxW={'container.lg'}>
                <Grid
                    templateColumns={{
                        base: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(4, 1fr)',
                    }}
                    gap={6}
                >
                    <GridItem w="100%" colSpan={{ base: 1, sm: 2, md: 2 }}>
                        <Heading as={'h3'} size="lg">
                            Insights From Data
                        </Heading>
                    </GridItem>
                    <GridItem w="100%">
                        <Flex flexDirection={'column'}>
                            <Stat>
                                <StatLabel fontSize={'xl'}>
                                    Chat Message Sent
                                </StatLabel>
                                <StatNumber
                                    fontSize={'3xl'}
                                    fontWeight={'bold'}
                                >
                                    15,670
                                </StatNumber>
                                <StatHelpText fontSize={'xl'}>
                                    <StatArrow type="increase" />
                                    23.36%
                                </StatHelpText>
                            </Stat>
                            <Box fontSize={'md'}>
                                Total number of users had grown in the past 30
                                days.
                            </Box>
                        </Flex>
                    </GridItem>
                    <GridItem w="100%">
                        <Flex flexDirection={'column'}>
                            <Stat>
                                <StatLabel fontSize={'xl'}>
                                    Unique Visit
                                </StatLabel>
                                <StatNumber
                                    fontSize={'3xl'}
                                    fontWeight={'bold'}
                                >
                                    1,045
                                </StatNumber>
                                <StatHelpText fontSize={'xl'}>
                                    <StatArrow type="increase" />
                                    9.05%
                                </StatHelpText>
                            </Stat>
                            <Box fontSize={'md'}>
                                The average time each user spent on platform in
                                a day.
                            </Box>
                        </Flex>
                    </GridItem>
                </Grid>
            </Container> */}
        </Box>
    )
}
