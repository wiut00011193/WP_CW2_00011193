const express = require('express')
const app = express()
const path = require('path')

//Load all the routers
const _index = require('./routes/index')
const _create = require('./routes/create')
const _update = require('./routes/update')
const _delete = require('./routes/delete')

const PORT = process.env.port || 3000 //Define the port number

app.set('view engine', 'pug') //Setting up the view engine

app.use('/static', express.static(path.join(__dirname, 'public'))) //Setting up the static folder
app.use(express.urlencoded({ extended: false }))

//Setting up all the routers
app.use('/', _index)
app.use('/create', _create)
app.use('/update', _update)
app.use('/delete', _delete)

app.listen(PORT, () => {
    console.log(`Ready on port ${PORT}`) })
