const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

const validate = require('../validate') //Function for form validation
const dbPath = path.join(__dirname, '../database/tasks.json')

//Task status options
const CATEGORIES = [
    { id: 0, title: 'undone' },
    { id: 1, title: 'done' },
]

router.get('/:id', (req, res) => {
    let tasks = JSON.parse(fs.readFileSync(dbPath)) //Get all tasks from JSON file
    let taskID = req.params.id
    let task = tasks.find(tempTask => tempTask.id == taskID)
    

    //Check whether the task with chosen id exists
    if(task == undefined) {
        let error_msg = `No task with id ${taskID} has been found!`
        res.redirect(`/?error_msg=${error_msg}`)
    } else { 
        res.render('update', { task: task, categories: CATEGORIES })
    }
})

router.post('/:id', (req, res) => {
    let form = req.body
    let taskID = req.params.id

    if(validate(form) == false){
        //Record all the changes before reloading the page with error message
        let task = {
            id:  Number(taskID),
            taskName: form.taskName,
            taskDesc: form.taskDesc,
            taskStatus: Number(form.taskStatus)
        }

        //Reload the page with error message
        res.render(`update`, { params: taskID, received: 'no', task: task, categories: CATEGORIES})
    } else {
        let tasks = JSON.parse(fs.readFileSync(dbPath)) //Get all tasks from JSON file

        //Update the corresponding task
        tasks = tasks.filter((task) => {
            if(task.id == taskID){
                task.taskName = form.taskName
                task.taskDesc = form.taskDesc
                task.taskStatus = Number(form.taskStatus)
            }
            return task
        })
        
        fs.writeFileSync(dbPath, JSON.stringify(tasks)) //persist the changes into JSON file

        //Go back to the home page
        res.redirect('/?success_msg=updated')
    }
})

module.exports = router