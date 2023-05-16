const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;


const adminSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method
adminSchema.statics.signup = async function (userName,password){

    //valid check
    if(!userName || !password){
        throw Error('All fields must be filled');
    }

    const exist = await this.findOne({ userName });
    if(exist){
        throw Error('UserName is already in use')
    }

    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(password,salt);

    const admin = await this.create({userName,password:hash});

    return admin
}
//static login method
adminSchema.statics.login = async function (userName,password){
    //valid check
    if(!userName || !password){
        throw Error('All fields must be filled');
    }

    const admin = await this.findOne({ userName });

    if(!admin){
        throw Error("Admin doesn't exist")
    }

    const match = await bcrypt.compare(password,admin.password);
    
    if(!match){
        throw Error("password is not correct")
    }
    
    return admin
}
module.exports = mongoose.model("Admin",adminSchema);