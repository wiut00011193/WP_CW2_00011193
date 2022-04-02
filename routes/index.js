const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', { success_msg: req.query.success_msg })
})

module.exports = router