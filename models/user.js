const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required : [true,'please enter an email'],
        unique :true,
        lowercase :true,
        validate:[isEmail,'please enter a valid email']

    },
    password:{
        type:String,
        required : [true,'please provide a password'],
        minlength :[6,'minimum password length is six characters']
    },
});

// fire a function after document has been saved in database
userSchema.post('save',function(doc,next){
console.log("new user has been created & saved");
next();
})
// will run after document has been saved 

userSchema.pre('save',async function(next){
    const salt= await bcrypt.genSalt();
    // console.log(salt);
    this.password =await bcrypt.hash(this.password, salt);
    next();
})

// static method 
userSchema.statics.login = async function (email,password){
    const user = await this.findOne({email});
    if (user){
      const auth =await bcrypt.compare(password,user.password);
    if(auth){
        return user;
    }
    throw Error("incorrect password");
    }
    throw Error("incorrect email");
}


const  User = mongoose.model('user',userSchema);

module.exports =User;