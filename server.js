// 3.1: Phonebook backend step 1
// Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.

// 3.2: Phonebook backend step 2
// Implement a page at the address http://localhost:3001/info that looks roughly like this:

// Screenshot for 3.2
// The page has to show the time that the request was received and how many entries are in the phonebook at the time of processing the request.
// There can only be one response.send() statement in an Express app route. Once you send a response to the client using response.send(), the request-response cycle is complete and no further response can be sent.

// 3.3: Phonebook backend step 3
// Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5
// If an entry for the given id is not found, the server has to respond with the appropriate status code.

// 3.4: Phonebook backend step 4
// Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.
// Test that your functionality works with either Postman or the Visual Studio Code REST client.

const express = require('express')
const app = express()


let persons =
    [
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

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const date = new Date();
    response.send(`Phonebook has info for ${persons.length} people
    \n${date}`)
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

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})