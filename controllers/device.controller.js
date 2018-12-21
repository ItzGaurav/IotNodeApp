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
            patientkey : req.body.patientkey,
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
    var query = { patientkey : req.body.patientkey}
    Device.find(query,{ _id: 0 },{ sort : { $natural : -1 }, limit : 10 },function(err,result){
        if (err) {
            return next(err);
        }
        res.send(result);
    });
}