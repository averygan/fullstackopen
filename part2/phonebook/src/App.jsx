import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const AddPerson = (event) => {
    event.preventDefault()

    const nameIsValid = newName.length > 0;
    const numberIsValid = newNumber.length > 0;
    const exists = persons.some(person => person.name === newName)

    if (!nameIsValid || !numberIsValid) {
      alert("Error: invalid name or number")
      return;
    }

    if (!exists)
    {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    else
    {
      if (window.confirm(`${newName} is already added to phonebook, replace old number?`))
      {
        const toUpdate = persons.find(person => person.name === newName)
        const personObject = { ...toUpdate, number:newNumber }
      
        personService
          .update(toUpdate.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== toUpdate.id ? person : returnedPerson))
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const toDelete = persons.find(person => person.id === id)
    if (!toDelete)
    {
      alert("Person not found");
      return ;
    }
    if (window.confirm(`Delete ${toDelete.name}?`))
    {
      personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(persons => persons.id !== id))
        })
        .catch(error => {
          alert(`Error: contact has already been deleted`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filter={filter} 
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new contact</h2>
      <PersonForm 
        AddPerson={AddPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>
      </div>
    </div>
  )
}

export default App