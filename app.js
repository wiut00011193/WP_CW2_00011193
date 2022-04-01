const express = require('express')
const app = express()
const PORT = process.env.port || 3000

app.set('view engine', 'pug')

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.log(`Ready on port ${PORT}`) })