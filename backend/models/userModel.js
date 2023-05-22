const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function (userName,password, isAdmin = false){

    //valid check
    if(!userName || !password){
        throw Error('All fields must be filled');
    }

    const exist = await this.findOne({ userName });

    if(exist){
        throw Error('UserName is already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({userName,password:hash, isAdmin});

    return user
}

//static login method
userSchema.statics.login = async function (userName,password){

    //valid check
    if(!userName || !password){
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({ userName });

    if(!user){
        throw Error("Admin doesn't exist")
    }

    const match = await bcrypt.compare(password,user.password);
    
    if(!match){
        throw Error("password is not correct")
    }
    
    return user
}

module.exports = mongoose.model("User",userSchema);