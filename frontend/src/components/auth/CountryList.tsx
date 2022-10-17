import { useEffect, useState } from 'react'
import { fetchJson } from '../../api/utils'

const { REACT_APP_API_SERVER } = process.env

export interface CountryItem {
    id: number
    name: string
}

function CountryList() {
    const [countryList, setCountryList] = useState<Array<CountryItem>>([])

    useEffect(() => {
        fetchJson<Array<CountryItem>>(
            `${REACT_APP_API_SERVER}/data/country`
        ).then((data) => {
            setCountryList(
                data.map((item) => ({
                    ...item,
                }))
            )
        })
    }, [])
    return (
        <>
            {countryList.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </>
    )
}

export default CountryList
