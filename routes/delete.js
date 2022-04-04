const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

const dbPath = path.join(__dirname, '../database/tasks.json')

router.get('/:id', (req, res) => {
    let tasks = JSON.parse(fs.readFileSync(dbPath)) //Get all tasks from JSON file
    let taskID = req.params.id

    //Check whether the task with chosen id exists
    if(tasks.find(task => task.id == taskID) == undefined) {
        let error_msg = `No task with id ${taskID} has been found!`
        res.redirect(`/?error_msg=${error_msg}`)
    }

    //return everything but the chosen task
    tasks = tasks.filter((task) => {
        return task.id != taskID ? task : null
    })

    fs.writeFileSync(dbPath, JSON.stringify(tasks)) //persist the changes into JSON file

    //Go back to the home page
    res.redirect('/?success_msg=deleted')
})

module.exports = router