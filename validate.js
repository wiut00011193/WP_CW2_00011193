module.exports = (data) => {
    if(data.taskName.trim().length <= 0 || data.taskDesc.trim().length <= 0)
        return false
    return true
}