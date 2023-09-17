const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}



const password = process.argv[2]
const name = process.argv[3]
const phoneNumber = process.argv[4]

const url =
  `mongodb+srv://test_fullstack:${password}@cluster0.obatlyn.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  id: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length===3) {
  console.log("phonebook:")
  Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person.name + " " + person.phoneNumber)
  })
  mongoose.connection.close()
  })

} else {

const person = new Person({
  name: name,
  phoneNumber: phoneNumber,
  id: 16,
})

person.save().then(result => {
  console.log(`added ${name} number ${phoneNumber} to phonebook`)
  //console.log(process.argv[3])
  //console.log(process.argv[4])
  //console.log(process.argv.length)
  mongoose.connection.close()
})
}

//FETCHING OBJ FROM THE DB


