const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let DeviceSchema = new Schema({
    heartbeat: {type: String, required: true, max: 100},
    temperature: {type: String, required: true},
    humidity: {type: String, required: true},
    patientkey: {type: String,required: true},
    time: {type: String,required: false}
});

module.exports = mongoose.model('Device',DeviceSchema);