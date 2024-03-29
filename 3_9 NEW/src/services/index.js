let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

import express from 'express'
//const express = require('express')
const app = express()

import morgan from 'morgan'
//const morgan = require('morgan')
app.use(morgan('tiny'))

import cors from 'cors'
//const cors = require('cors')
app.use(cors())

app.use(express.json())

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.post('/api/persons', (req, res) => {
    console.log(req.body)
    const per = {
      name: req.body.name,
      number: req.body.number,
      id: Math.floor(Math.random() * 22222)
    }
    const personI = persons.findIndex(pers => pers.name === per.name) 

    if(!req.body.name  ){
      return res.status(400).json({ 
        error: 'name missing' 
      })
    } else if (!req.body.number) {
        return res.status(400).json({ 
          error: 'number missing'  
        })
    } else if (personI > -1) {
        return res.status(400).json({ 
          error: 'name must be unique'  
        })
    } else {
        persons = persons.concat(per)
        res.json(per)
    }
  })

    

  app.get('/info', (request, response) => {
    response.send('Phonebook has info for 2 people <br />' + new Date(8.64e15).toString())
  })

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const personI = persons.findIndex(pers => pers.id === id) 
    if(id){
        persons.splice(personI, 1)
        return res.status(200);
    } else {
        return res.status(404);
    }

  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

