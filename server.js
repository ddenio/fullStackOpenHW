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

// 3.5: Phonebook backend step 5
// Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.
// Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate ids is small.

// 3.6: Phonebook backend step 6
// Implement error handling for creating new entries. The request is not allowed to succeed, if:
// The name or number is missing
// The name already exists in the phonebook
// Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error, e.g.:

// { error: 'name must be unique' }
// 3.7: Phonebook backend step 7
// Add the morgan middleware to your application for logging. Configure it to log messages to your console based on the tiny configuration.
// The documentation for Morgan is not the best, and you may have to spend some time figuring out how to configure it correctly. However, most documentation in the world falls under the same category, so it's good to learn to decipher and interpret cryptic documentation in any case.
// Morgan is installed just like all other libraries with the npm install command. Taking morgan into use happens the same way as configuring any other middleware by using the app.use command.

const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(morgan('tiny'))

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

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const existingPerson = persons.find(person => person.name === body.name)

    if (existingPerson) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
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