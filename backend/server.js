const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/categories')
const cookieParser = require('cookie-parser');
const cors = require('cors');

// express app
const app = express();

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

