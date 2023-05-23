//Phonebook backend step1
//Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.

const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const getAll = () => {
	fetch("http://localhost:3001/persons")
  .then(res => res.json()).then(result =>  result)
}



app.get('/api/persons', (request, response) => {
  fetch("http://localhost:3001/persons")
  .then(res => res.json()).then(result => response.send(result))
})

app.get('/info', (request, response) => {
	//fetch("http://localhost:3001/persons")
    //.then(res => res.json()).then(result => response.write("<p>The temp in Brighton, UK is " + result.length + " degrees</p>"))
    const persLength = fetch("http://localhost:3001/persons/")
    .then((res) => res.json())
    .then((result) =>
    {
    	return result.length
    })
    //console.log(persLength)

    async function foo() {
	  const res = await fetch("http://localhost:3001/persons/") ;
	  const result = await res.json();
	  const miro = result;
	  console.log('miro',miro); // or use the result variable
	  return miro.length;
	}
	//foo() ;
   
   //  const printPers = () => {
  	// 	persLength.then((a) => {
  	// 	bbb = a
   //  	return a;
  	// 	})
  		
  	// }
  	const promiseLength = foo().then(
  		function(value){
  			response.send(`Phonebook ${value} <br>${Date()}`)
  		});
  	//console.log('print pers', aaa)
	// async function getPersons() {	
	// 	let asd = await fetch("http://localhost:3001/persons")
	// 	console.log('asd')
	//     return asd.json()
	// }
	// const d = (async () => {
	// 	//console.log(await getPersons())
	// 	return await getPersons().length
	// })()
	// console.log('d', d)
	//response.send(`Phonebook ${aaa} </ br>${Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  async function foo() {
      const res = await fetch("http://localhost:3001/persons/") ;
      const result = await res.json();
      const miro = result;
      console.log('miro',miro); // or use the result variable
      const person = miro.find(pers => pers.id === id)
      if(person){
        return person
      }
      return null
    }
  const promiseLength = foo().then(
      function(value){
        if(value){
          console.log('value', value.id)
          console.log('id', id)
          console.log('value', value)
          response.send(value)
        } else {
          console.log('id', id)
          console.log('value', value)
          response.status(404).end()
        }
        //console.log('value', value)
        //response.send(value)
      });

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  async function foo() {
      const res = await fetch("http://localhost:3001/persons/") ;
      const result = await res.json();
      const miro = result;
      console.log('miro',miro); // or use the result variable
      const persons = miro.filter(pers => pers.id !== id)
      return persons
    }
  const promiseDelete = foo().then(
      function(value){
        console.log('value', value)  
        response.status(204).end()
        //console.log('value', value)
        //response.send(value)
      });
})

app.post('/api/persons', (request, response) => {
  const maxId = Math.floor(Math.random() * 99999999)
  //const person = request.body
  //person.id = maxId
  async function foo() {
      const res = await fetch("http://localhost:3001/persons/") ;
      const result = await res.json();
      const miro = result;
      console.log('miro',miro); // or use the result variable
      return miro
    }
  const promiseDelete = foo().then(
      function(value){
        if(value){
           const body = request.body
           if (!body.name) {
              return response.status(400).json({ 
                error: 'content missing' 
              })
            }
           const person = {
              name: body.name,
              number: body.number || false,
              id: maxId
           }
           value = value.concat(person)
           response.json(person)
        }  else {
          response.status(204).end()
        }
        //console.log('value', value)
        //response.send(value)
      });
  //console.log('person', person)
})



const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})