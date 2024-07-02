import axios from 'axios'
import { useEffect, useState } from 'react'

const DisplayCountry = ({country}) => {
    const [countryData, setCountryData] = useState(null)

    useEffect(() => {
    axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
            setCountryData(response.data)
            console.log(response.data)
    })}, [country])

    if (!countryData)
        return null;

    const keys = Object.keys(countryData.languages)

    return (
        <div>
            <h2>{country}</h2>
            <div>
                <p>Capital: {countryData.capital}</p>
                <p>Population: {countryData.population}</p>
                <h3>Languages</h3>
                    <ul>
                        {keys.map(key => <li key={key}>{countryData.languages[key]}</li>)}
                    </ul>
                <img src={countryData.flags.png} alt="country flag"></img>
            </div>
        </div>
    )
}

export default DisplayCountry