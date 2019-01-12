require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const users = [
  {
    userId: '1',
    username: 'juliosguz',
    email: 'julio.sguz@gmail.com'
  },
  {
    userId: '2',
    username: 'juliosilva',
    email: 'juliosilva@gmail.com'
  },
  {
    userId: '3',
    username: 'silvajulio',
    email: 'silvajulio@gmail.com'
  }
]

app.use(bodyParser.json())

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

app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido!! :D'
  })
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
      id: 2 ,
      name: 'sioy un mal nombre 2'
    },
  ])
})

app.listen(process.env.TW_PORT)
