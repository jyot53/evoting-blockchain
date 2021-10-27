const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {console.log("Connection Succesfull")}).catch(err =>console.log("No Connection "+err));