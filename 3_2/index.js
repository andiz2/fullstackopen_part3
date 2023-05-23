//Phonebook backend step1
//Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.

const express = require('express')
const app = express()
app.use(express.json())

const getAll = () => {
	fetch("http://localhost:3001/persons")
  .then(res => res.json()).then(result => persons.concat(result))
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



const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})