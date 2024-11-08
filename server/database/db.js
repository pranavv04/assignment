const mongoose = require('mongoose')
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL

mongoose.connect(mongoUrl , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected' , ()=>console.log('mongoose connected'))
db.on('disconnected' , ()=> console.log('mongoose disconnected'))
db.on('error' , (error)=>{
    console.log('Database error' , error)
}) 


module.exports = db;