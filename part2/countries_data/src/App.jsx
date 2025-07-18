import {useState, useEffect } from "react";
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const countriesToShow = () => {
    if (!filter.trim()) {
      return [];
    }
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
    if (filtered.length > 10) {
      return 'Sea más especifico';
    }
    if (filtered.length === 1) {
      return filtered[0]; // Retorna el objeto país
    }
    return filtered;
  };

  const handleFilterChangue = (event) => {
    setFilter(event.target.value)
  }

  const handleShowSpecificCoutry = (name) => {
    const country = countries.find((country) => country.name.common === name)
    console.log("country", country)
    setFilter(country.name.common)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChangue} />
      <Countries countries={countriesToShow()} handleShowSpecificCoutry={handleShowSpecificCoutry} />
    </div>
  )
}

export default App
