const express = require('express');
const router = express.Router();

const device_controller = require('../controllers/device.controller');

router.get('/testdevice',device_controller.testdevice);

router.post('/insertdevicedata', device_controller.insert_devicedata);

router.get('/getdevicedata',device_controller.get_devicedata);

module.exports = router;