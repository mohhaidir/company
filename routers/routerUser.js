const express = require('express')
const router = express.Router()
const ControllerUsers = require('../controllers/controllerUsers')

router.get('/', ControllerUsers.list)

module.exports = router