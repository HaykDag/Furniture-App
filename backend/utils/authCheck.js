const User = require("../models/userModel");

const authCheck = (userName)=>{
    
    const user = User.find({userName});
    
    if(!user || user.isAdmin===false) {
        return false;
    }
    return true;
}

module.exports = authCheck;