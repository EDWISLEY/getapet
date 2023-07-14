require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const app = express()

//Config JSON response => responder
app.use(express.json())

//Solve CORS =>Resolver o problema
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))

//Public folder for images => pastas públicas para imagens
app.use(express.static('public'))

//Routes
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(5000)
