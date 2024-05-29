
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION).then(
    result=>{
        console.log("mongodb atlas connected with server");
    }

).catch(err=>{
    console.log("connection failed");
    console.log(err);
})
