require('dotenv').config()
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido!! :D'
  })
})

app.get('/users', (req, res) => {
  res.json([
    {
      id: 1,
      firstName: 'Julio',
      email: 'juliosguz@gmail.com'
    },
    {
      id: 2,
      firstName: 'Cesar',
      email: 'julio.sguz@gmail.com'
    }
  ])
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