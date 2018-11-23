const Device = require('../models/device.model');

exports.testdevice = (req,res) => {
    res.send('this is device data');
}

exports.insert_devicedata = (req,res,next) => {
    let device = new Device(
        {
            heartbeat : req.body.heartbeat,
            temperature : req.body.temperature,
            humidity : req.body.humidity,
            time:new Date()
        }
    );

    device.save(function (err, device) {
        if (err) {
            return next(err);
        }
        res.send(device);
    });
}

exports.get_devicedata = (req,res,next) => {
    Device.find({},{ _id: 0 },function(err,result){
        if (err) {
            return next(err);
        }
        res.send(result);
    });
}