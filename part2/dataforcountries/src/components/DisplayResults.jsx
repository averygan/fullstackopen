import DisplayCountry from './DisplayCountry'
import { useState } from 'react'

const DisplayResults = ({countries}) => {
    const [selectedCountry, setSelectedCountry] = useState(null)

    const toggleShow = (country) => {
        if (selectedCountry === country)
            setSelectedCountry(null)
        else
            setSelectedCountry(country)
    }

    return (
        <div>
            {countries.map((country, index) => (
                <div key={index}>
                    <p>{country}</p>
                    <button onClick={() => toggleShow(country)}>show</button>
                    {selectedCountry === country && <DisplayCountry country={country} />}
                </div>
            ))}
        </div>
    )
}

export default DisplayResults