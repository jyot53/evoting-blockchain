const mongoose = require('mongoose');


const aadharSchema = new mongoose.Schema({
    aadharNo : { 
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    email : { 
        type: String,
        required: true
    },
    status : { 
        type: Boolean,
        default : false
    },
    age : { 
        type : String,
        required: true
    },
    name : { 
        type: String,
        required: true
    }
});


const Aadhar = mongoose.model('Aadhar',aadharSchema);

module.exports = Aadhar;