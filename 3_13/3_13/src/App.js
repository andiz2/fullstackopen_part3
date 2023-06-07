//2_16

import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import personService from './services/notes'

const App = () => {

 
  const [persons, setPersons] = useState([])
  //   { name: 'Arto Hellas',
  //   number: '040-1234567',
  //   id: 1 }
  // ]) 

  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(persons)
  const [updateMessage, setUpdateMessage] = useState(null)

  var initialList = JSON.parse(JSON.stringify(persons));

 useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newPerson,
      number: newNumber,
      id: persons.slice(-1)[0].id + 1
    }
    console.log("persons", persons)
    console.log("newPerson", newPerson)
    console.log("nameObj", nameObject)
    

    let validPers = persons.some(el => el.name === nameObject.name)
    if(!validPers){
      console.log("el", validPers)
      setPersons(persons.concat(nameObject))
      setUpdateMessage(
            `Added ${nameObject.name}`
          )
          setTimeout(() => {
            console.log('intra in settimeout updatedmessage?', updateMessage)
            console.log('nameobject din settimeout', nameObject.name)
            setUpdateMessage(null)
          }, 5000)
      personService
      .create(nameObject)
      .then(response => {
        //console.log("nameObject din validpers", nameObject)
        //console.log("returnedPerson din validpers", returnedPerson)
        //
        console.log('persons din validpers', persons)
        //console.log('persons din validpers', response.status)
        console.log('persons din validpers', response.data)
        console.log('response din validpers', response)
      })
    } else {
      alert(`${nameObject.name} is already added to phonebook`)
    }
    setNewPerson('')
    setNewNumber('')

  }


  const handlePersonChange = (event) => {
    setNewPerson(event.target.value)
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const deleteContact = (pers) =>{
    console.log('deleteContact', pers)
    var newList = [...persons]
    let toDelete = newList.find(person => person.id === pers)
    console.log('toDelete', toDelete)
    if(window.confirm(`Do you really want to delete ${toDelete.name}`)){
      personService
        .deletePers(pers)
        .then(deletedlPerson => {
          console.log(deletedlPerson)
        })
      var newList = [...persons]
      newList = newList.filter(person => person.id !== pers)
      console.log('newList', newList)
      setPersons(newList)
    }
    // personService
    //   .getAll()
    //   .then(initialPersons => {
    //     setPersons(initialPersons)
    //   })
  }



  const filterPerson = (event) => {
    const query = event.target.value
    var updatedList = [...persons]
    updatedList = updatedList.filter(person => person.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    setShowAll(updatedList)
    setPersons(updatedList)
    console.log("ShowAll", showAll)
    if(query === ''){
      setShowAll(initialList)
      setPersons(initialList)
    }
    console.log('truee?', query=== '')
    console.log('initialList', initialList)
  }

  //console.log(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={updateMessage} />
      <Filter showAll = {showAll}
      filterPerson = {filterPerson}
      />      

      <h2>add a new</h2>
      <PersonForm addPerson = {addPerson}
       newPerson = {newPerson} 
       handlePersonChange = {handlePersonChange} 
       newNumber = {newNumber}
        handleNumberChange = {handleNumberChange}/>

      <h2>Numbers</h2>
      {console.log('persNumbers',persons)}
      {persons.map(person => 
        <Person key = {person.id} id={person.id} 
        name = {person.name} number = {person.number}
        deleteContact = {() => deleteContact(person.id)}

         />)} 
        
        
      
    </div>
  )
}

export default App
