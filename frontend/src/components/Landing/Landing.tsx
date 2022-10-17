import { Box, Flex, VStack } from '@chakra-ui/react'
import Nav from '../common/navBar/NavBar'
import CallToAction from './callToAction/CallToAction'
import InfiniteGrid from './infiniteGrid/InfiniteGrid'
import Dock from '../common/dock/Dock'

function Landing() {
    return (
        <Box w="auto" h="full">
            <Nav />
            <VStack w="auto">
                {/* === Main Section - Call To Action === */}
                <Flex w="90vw" mb={1} justify="center">
                    <CallToAction />
                </Flex>
                <Box w="90vw">
                    <InfiniteGrid />
                </Box>
            </VStack>
            <Dock />
        </Box>
    )
}

export default Landing
