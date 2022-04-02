const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

const PORT = process.env.port || 3000
const dbPath = path.join(__dirname, 'database/tasks.json')

app.set('view engine', 'pug')

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.log(`Ready on port ${PORT}`) })