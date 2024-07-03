import DisplayResults from './DisplayResults'
import DisplayCountry from './DisplayCountry'

const Results = ({countries, filter}) => {
    const filtered = filter === '' ? countries : countries.filter(country => country.toLowerCase().includes(filter.toLowerCase()))
    console.log(filtered)
    if (filtered.length === 1)
        return <DisplayCountry country={filtered[0]} />
    if (filtered.length > 1 && filtered.length <= 10)
        return <DisplayResults countries={filtered} />
    return null;
} 

export default Results