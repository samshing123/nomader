import { useEffect } from 'react'
import { useNavigate } from 'react-router'

function Skyscanner() {
    const navigate = useNavigate()
    useEffect(() => {
        window.open(
            'https://www.skyscanner.com.hk/',
            '_blank',
            'noopener,noreferrer'
        )
        navigate('/home')
    })
    return <div></div>
}

export default Skyscanner
