const mongoose = require('mongoose');

const mappingSchema = new mongoose.Schema({
    aadharNo : { 
        type: String,
        required: true
    },
    accountaddress : { 
        type: String,
        required: true
    },
});


const Mapping = mongoose.model('MAPPING',mappingSchema);

module.exports = Mapping;  