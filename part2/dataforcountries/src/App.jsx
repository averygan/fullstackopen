import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  // store all countries
  const[countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response=> {
        const names = response.data.map(country => country.name.common)
        setCountries(names)
      })
  }, [])
  console.log(countries)

  // search bar to find countries
  // show countries that matches search term
}

export default App
