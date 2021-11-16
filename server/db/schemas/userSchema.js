const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name : { 
        type: String,
        required: true
    },
    email : { 
        type: String,
        required: true
    },
    aadhar : { 
        type: String,
        required: true
    },
    password : { 
        type: String,
        required: true
    },
    cpassword : { 
        type: String,
        required: true
    },
    date:{ 
        type:Date,
        default: Date.now
    },
    tokens : [
        {
            token : {
                type: String,
                required: true
            }
        }
    ],
    status :{ //voting status
        type : Boolean,
        default: false
    },
    isregister:{
        type: Boolean,
        default: false
    },
    gender:{
        type: String,
        required: true
    }
});


userSchema.pre('save',async function(next) {    
    if(this.isModified('password')){
      this.password = await bcryptjs.hash(this.password,12);
      this.cpassword = await bcryptjs.hash(this.cpassword,12);
    }

    next();
});

userSchema.methods.generateAuthToken = async function(){
   try{

       let token = jwt.sign({_id: this._id},process.env.SECRET);
       this.tokens = this.tokens.concat({token:token});
       await this.save();
       return token;

   }catch(err){
       console.log(err);
   }
}


const User = mongoose.model('USER',userSchema);

module.exports = User;  