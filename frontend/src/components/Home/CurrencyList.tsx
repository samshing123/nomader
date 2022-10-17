import { useEffect, useState } from 'react'
import { fetchJson } from '../../api/utils'

const { REACT_APP_API_SERVER } = process.env

export interface CurrencyItem {
    code: string
}

function CurrencyList() {
    const [currencyList, setCurrencyList] = useState<Array<CurrencyItem>>([])

    useEffect(() => {
        fetchJson<Array<CurrencyItem>>(
            `${REACT_APP_API_SERVER}/data/code`
        ).then((data) => {
            setCurrencyList(
                data.map((item) => ({
                    ...item,
                }))
            )
        })
    }, [])
    return (
        <>
            {currencyList.map((item, idx) => (
                <option key={idx} value={item.code}>
                    {item.code}
                </option>
            ))}
        </>
    )
}

export default CurrencyList
