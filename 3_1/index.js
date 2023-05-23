//Phonebook backend step1
//Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.

const express = require('express')
const app = express()
app.use(express.json())


app.get('/api/persons', (request, response) => {
  fetch("http://localhost:3001/persons")
  .then(res => res.json()).then(result => response.send(result))
})


const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})