const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

const dbPath = path.join(__dirname, '../database/tasks.json')

router.get('/', (req, res) => {
    let tasks = JSON.parse(fs.readFileSync(dbPath))
    res.render('index', { tasks: tasks, success_msg: req.query.success_msg, error_msg: req.query.error_msg })
})

module.exports = router