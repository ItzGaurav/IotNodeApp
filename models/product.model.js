const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let TireSchema = new Schema({
    tyreid: {type: String, required: true, max: 100},
    pressure: {type: String, required: true},
});

//Export the model

module.exports = mongoose.model('Product',TireSchema);