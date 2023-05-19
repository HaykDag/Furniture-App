const jwt = require("jsonwebtoken");

const generateToken = (res, userName) =>{
    const token = jwt.sign({ userName },process.env.SECRET,{
        expiresIn: '1d'
    })

    res.cookie('access_token',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV !== 'development',
        SameSite: 'strict',
        maxAge: 86400000 //1day in miliseconds
    })
    
}

module.exports =  generateToken;