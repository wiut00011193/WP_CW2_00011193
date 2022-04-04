const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

const validate = require('../validate') //Function for form validation
const dbPath = path.join(__dirname, '../database/tasks.json')

router.get('/', (req, res) => {
    res.render('create')
})

router.post('/', (req, res) => {
    let form = req.body
    if(validate(form) == false){
        res.render('create', { received: 'no', form: form})
    } else {
        let tasks = JSON.parse(fs.readFileSync(dbPath)) //Get all tasks from JSON file
        let taskID = tasks.length >= 1 ? (tasks[tasks.length - 1].id + 1) : 0 //Define id of the new task

        //Create the new task
        let task = {
            id: taskID,
            taskName: form.taskName,
            taskDesc: form.taskDesc,
            taskStatus: 0
        }

        tasks.push(task) //push the new task into json array
        fs.writeFileSync(dbPath, JSON.stringify(tasks)) //persist the changes into JSON file

        //Go back to the home page
        res.redirect('/?success_msg=created')
    }
})

module.exports = router