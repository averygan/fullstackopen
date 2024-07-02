import { useState, useEffect } from 'react'
import axios from 'axios'
import Results from './components/Results'

const App = () => {
  // store all country names
  const[countries, setCountries] = useState([])
  const[filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response=> {
        const names = response.data.map(country => country.name.common)
        setCountries(names)
        console.log(countries)
      })
  }, [])

  const handleFilterChange = () => {
    setFilter(event.target.value)
  }
  // search bar to find countries
  // show countries that matches search term
  return (
    <div>
      <form>
        find countries <input value={filter} onChange={handleFilterChange} />
      </form>
      <Results countries={countries} filter={filter}/>
    </div>
  )
}

export default App
