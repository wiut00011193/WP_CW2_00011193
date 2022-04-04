module.exports = (data) => {
    //Chek whether there was some input for both name and description of the task
    if(data.taskName.trim().length <= 0 || data.taskDesc.trim().length <= 0)
        return false
    return true
}