require('dotenv').config()
const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const users = require('./users.mock')

app.use(bodyParser.json())

// HATEOAS
// Hypermedia as the engine of application state

app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido!! :D'
  })
})

const cats = [
  {
    name: 'El Pitus'
  },
  {
    name: 'Luna'
  }
]

app.get('/cats', (req, res) => {
  // Asi puedes obtener el query string desde una URL
  const queryString = req.query
  console.log('queryString', queryString)
  res.json({
    result: cats,
    links: [
      {
        rel: 'self',
        href: 'http://localhost:3030/cats',
        type: 'GET'
      }
    ]
  })
})

app.get('/cats/1', (req, res) => {
  res.json({
    ...cats[1],
    links: [
      {
        rel: 'self',
        href: 'http://localhost:3030/cats/1'
      },
      {
        rel: 'cats',
        href: 'http://localhost:3030/cats'
      }
    ]
  })
})

app.post('/auth/login', (req, res) => {
  // Aqui agregar tu condicion de evaluacion de login
  res.json({
    token: jwt.sign({ twitch: 'https://www.twitch.tv/juliosguz' }, process.env.TW_SECRET)
  })
})

app.use((req, res, next) => {
  let token = req.headers.authorization
  token = token ? token.split(' ')[1] : ''
  try {
    jwt.verify(token, process.env.TW_SECRET)
    next()
  } catch (error) {
    res
      .status(412)
      .json({
        message: 'Token invalido'
      })
  }
})

// AREA PROTEGIDA POR JWT

app.get('/users', (req, res) => {
  res.json(users)
})

// /collections/resource
// /users/asd768hgasd8765asdjhg876

app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId
  const currentUser = users.find(user => {
    return user.userId === userId
  })
  res.json(currentUser ? currentUser : { message: 'Usuario no encontrado' })
})

app.post('/users', (req, res) => {
  const newUser = req.body
  newUser.creationDate = Date.now()
  users.push(req.body)
  res.json({
    message: 'Usuario agregado'
  })
})

app.put('/users/:userId', (req, res) => {
  const userId = req.params.userId
  // const currentUser = users.find(user => {
  //   return user.userId === userId
  // })

  if (users[userId]) {
    users[userId].username = req.body.username
  }

  res.json(users[userId])
})

app.get('/products/p1', (req, res) => {
  res.json({
    id: 'p1',
    name: 'Arroz',
    price: 123
  })
})

app.get('/v1/letters/l1', (req, res) => {
  res.json({
    id: 'l1',
    name: 'Love letter'
  })
})

// https://juliosguz.com/api/v1/users/1
// https://api.juliosguz.com/v1/users/1

app.get('/v1/users/1', (req, res) => {
  res.json({
    id: 1,
    name: 'Julio',
    addresses: [
      {
        id: 'a1',
        street: 'Por ahi 1'
      },
      {
        id: 'a2',
        street: 'Por ahi 2'
      }
    ]
  })
})

app.get('/v1/users/1/addresses', (req, res) => {
  res.json([
    {
      id: 'a1',
      street: 'Por ahi 1'
    },
    {
      id: 'a2',
      street: 'Por ahi 2'
    }
  ])
})

app.get('/v1/users/1/addresses/a1', (req, res) => {
  res.json({
    id: 'a1',
    street: 'Por ahi 1'
  })
})

// Esto no se hace, plssss XD
app.get('/getUsers', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'sioy un mal nombre'
    },
    {
      id: 2,
      name: 'sioy un mal nombre 2'
    }
  ])
})

app.listen(process.env.TW_PORT)
