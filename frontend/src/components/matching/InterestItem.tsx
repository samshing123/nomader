import styles from './Interest.module.css'
import { WrapItem, Center } from '@chakra-ui/react'

type Props = {
    id: number
    title: string
    isSelected?: boolean
    toggle: () => void
}

function InterestItem(props: Props) {
    let border = props.isSelected ? '4px solid' : '1px solid'
    let blur = props.isSelected ? 'blur(10px)' : ''

    return (
        <WrapItem>
            <Center
                w="6rem"
                h="6rem"
                border={border}
                borderRadius="5%"
                borderColor="#ffffff"
                margin={0.5}
                backdropFilter={blur}
            >
                <button className={styles.btn} onClick={props.toggle}>
                    {props.title}
                </button>
            </Center>
        </WrapItem>
    )
}

export default InterestItem
