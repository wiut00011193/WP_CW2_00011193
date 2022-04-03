const express = require('express')
const app = express()
const path = require('path')

const index = require('./routes/index')
const create = require('./routes/create')
const update = require('./routes/update')

const PORT = process.env.port || 3000

app.set('view engine', 'pug')

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

app.use('/', index)
app.use('/create', create)
app.use('/update', update)

app.listen(PORT, () => {
    console.log(`Ready on port ${PORT}`) })
