const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/categories')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const verifyToken = require('./utils/verifyToken');


// express app
const app = express();

// app.use(function (req,res,next){
//     res.header("Access-Control-Allow-Credentials",true);
//     res.header("Access-Control-Allow-origin","*");
//     res.header("Access-Contol-Allow-Methods",
//     "GET,PUT,POST,DELETE,UPDATE,OPTIONS");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "X-Requested-With,X-HTTP-Method-Override, Content-Type, Accept"
//     );
//     next();
// })

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));

// middleWares
app.use(cookieParser());
app.use(express.json());


// routes
app.use('/items', itemRoutes);
app.use('/categories', categoryRoutes);
app.use('/user', userRoutes);


//error handling
app.use((err,req,res,next)=>{
    
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong'
    return res.status(errorStatus).json({error:errorMessage})
});

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log('listening to port ' + process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })

