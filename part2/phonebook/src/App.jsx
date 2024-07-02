import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

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
      setNotification("error: invalid name or number")
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
          setNotification(`${newName} has been added to Phonebook`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
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
            setNotification(`${returnedPerson.name}'s number has been updated to ${returnedPerson.number}`)
            setTimeout(() => {
              setNotification(null)
            }, 3000)          
          })
          .catch(error => {
            setNotification(`error: ${toUpdate.name} has been removed from server`)
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
      setNotification("error: person not found");
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
          setNotification(`error: contact has already been deleted`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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