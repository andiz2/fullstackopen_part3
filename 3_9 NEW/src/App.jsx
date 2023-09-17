import persService from './services/persons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './Person'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(persons)
  const [errorMessage, setErrorMessage] = useState(null)

  console.log('newFilter', newFilter)

  let filterP = newFilter
  ? persons.filter(person => (person.name.toLowerCase().includes(newFilter) || person.number.toLowerCase().includes(newFilter)))
  : persons
  
  console.log('filterP', filterP)
  console.log('showAll', showAll)
  

  useEffect(() => {
    console.log('effect')
    persService
        .getAll()
        .then(response => {
          setPersons(response.data)
        })
        
  }, [persons.length])
  //console.log('render', persons.length, 'persons')

  const handleFilter = (e) => {
    setNewFilter(e.target.value)
  }

  const handlePerson = (e) => {
    setNewName(e.target.value)
  }

  const handleNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()
    const pObj = {
      name: newName,
      number: newNumber
    }
    let obj = persons.find(per => per.name === newName)
  
    if(obj) {
      alert(`${newName} is already added to phonebook`)
    } else {
      
      setErrorMessage(`${newName} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      axios
      .post('http://localhost:3001/api/persons', pObj)
      .then(response => {
        setPersons(persons.concat(pObj))
        setNewName('')
        setNewNumber('')
    })
    }
  }


  const deletePersonOf = id => {
    const url = `http://localhost:3001/api/persons/${id}`
    const personI = persons.findIndex(pers => pers.id === id) 
    console.log('id', id)
    console.log('person index', personI)
    console.log('index', )
    if(personI > -1){
      filterP = persons
      console.log('filterP', filterP)
      persons.splice(personI, 1)
      persService
      .toDelete(id)
      //am luat de pe net codul asta cu setPersons..si nu functioneaza asa cum as vrea..
      .then(setPersons(
        persons.filter((person) => {
          console.log('person', person)
          return person.id !== id;
        })
      ))
      
      console.log('persons in if', persons)
    }
  }


  return (
    <div>
      <Notification message = {errorMessage}/>
      <h2>Phonebook</h2>
      filter shown with <Filter newFilter = {newFilter} handleFilter = {handleFilter} />
      <h2>add a new</h2>
      <PersonForm 
        addPerson = {addPerson} 
        newName = {newName}
        handlePerson = {handlePerson}
        newNumber = {newNumber}
        handleNumber = {handleNumber}
      />
      
      
      <h2>Numbers</h2>
      
        {filterP.map(person => 
          <Person key = {person.name}
            name = {person.name}
            number = {person.number}
            deletePerson = {() => deletePersonOf(person.id)}/>
      )}
      
    </div>
  )
}

export default App