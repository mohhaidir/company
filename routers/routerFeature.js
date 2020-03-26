const express = require('express')
const router = express.Router()
const ControllerFeatures = require('../controllers/controllerFeatures')

router.get('/add', ControllerFeatures.addForm)
router.post('/add', ControllerFeatures.add)

router.get('/list/:userId', ControllerFeatures.list)

router.get('/:id/approve', ControllerFeatures.approve)
router.get('/:id/reject', ControllerFeatures.reject)

router.get('/closed', ControllerFeatures.closed)

router.get('/:id/remove', ControllerFeatures.remove)

module.exports = router