const mongoose = require('mongoose');

if(process.argv.length < 3) {
  console.log('Please provide the password and name as arguments: node mongo.js <password> <name>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://kbhowmickonline_db_user:${password}@cluster0.g7qbkse.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4})

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

if ( name && number ) {
    const person = new Person({
        name: name,
        number: number
        }) 
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close() 
    }) } 

    else if ( name ) {
        Person.find({name:name}).then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
    } else {
        console.log('Phonebook:')
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
    }   




