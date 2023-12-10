import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      const countryName = name.toLowerCase()
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
        .then(response => {
          console.log('response', response)
          setCountry({...response, found: true})

        }).catch(error => {
          console.log('error', error)
          setCountry({ found: false })
        })
    }
  }, [name]) // Runs whenever `name` changes
  
  // console.log('country.found', country.found)
  return country
}

const Country = ({ country }) => {
  // console.log('country', country)
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const name = country.data.name.common
  const capital = country.data.capital
  const population = country.data.population
  const flag = country.data.flags

  return (
    <div>
      <h3>{name} </h3>
      <div>capital {capital} </div>
      <div>population {population}</div> 
      <img src={flag.png} height='100' alt={`flag of ${name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text') // for input field
  const [name, setName] = useState('') // for country name
  const country = useCountry(name) // for country data

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }
  // console.log('name', name, 'nameInput', nameInput.value)
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App