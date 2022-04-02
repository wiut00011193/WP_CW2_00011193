const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

const validate = require('../validate')
const dbPath = path.join(__dirname, '../database/tasks.json')

router.get('/', (req, res) => {
    res.render('create', { received: req.query.received })
})

router.post('/', (req, res) => {
    let form = req.body
    if(validate(form) == false){
        res.redirect('/create?received=no')
    } else {
        let data = JSON.parse(fs.readFileSync(dbPath))
        let taskID = data.length >= 1 ? (data[data.length - 1].id + 1) : 0 
        let task = {
            id: taskID,
            taskName: form.taskName,
            taskDesc: form.taskDesc,
            taskStatus: 'undone'
        }

        data.push(task)
        fs.writeFileSync(dbPath, JSON.stringify(data))

        res.redirect('/?success_msg=created')
    }
})

module.exports = router