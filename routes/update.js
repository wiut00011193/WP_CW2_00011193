const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

const validate = require('../validate')
const dbPath = path.join(__dirname, '../database/tasks.json')

const CATEGORIES = [
    { id: 0, title: 'undone' },
    { id: 1, title: 'done' },
]

router.get('/:id', (req, res) => {
    let taskID = req.params.id
    let data = JSON.parse(fs.readFileSync(dbPath))
    let task = data.find(tempTask => tempTask.id == taskID)

    if(task == undefined) {
        let error_msg = `No task with id ${taskID} have been found!`
        res.redirect(`/?error_msg=${error_msg}`)
    } else { 
        res.render('update', { task: task, categories: CATEGORIES })
    }
})

router.post('/:id', (req, res) => {
    let form = req.body
    let taskID = req.params.id

    if(validate(form) == false){
        let task = {
            id:  Number(taskID),
            taskName: form.taskName,
            taskDesc: form.taskDesc,
            taskStatus: Number(form.taskStatus)
        }
        res.render(`update`, { params: taskID, received: 'no', task: task, categories: CATEGORIES})
    } else {
        let data = JSON.parse(fs.readFileSync(dbPath))

        data = data.map((tempData) => {
            if(tempData.id == taskID){
                tempData.taskName = form.taskName
                tempData.taskDesc = form.taskDesc
                tempData.taskStatus = Number(form.taskStatus)
            }
            return tempData
        })
        
        fs.writeFileSync(dbPath, JSON.stringify(data))

        res.redirect('/?success_msg=updated')
    }
})

module.exports = router