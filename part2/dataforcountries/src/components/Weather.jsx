import axios from 'axios'
import { useState, useEffect } from 'react'
const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = import.meta.env.VITE_API_KEY

const Weather = ({countryData}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios
        .get(`${weatherAPI}${countryData.capital[0]}&appid=${API_KEY}`)
        .then(response => {
            console.log(response.data)
            setWeather(response.data)})
    }, [countryData])

    if (!weather)
        return null;

    return (
        <div>
            <h2>Weather in {countryData.capital[0]}</h2>
            <p>temperature {(weather.main.temp - 273.15).toFixed(2)} celcius, {weather.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather