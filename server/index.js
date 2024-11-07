const express = require('express')
const app = express();
const cors = require('cors')
const db = require('./database/db')
require('dotenv').config();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/', (req,res)=>{
    res.send('Server is live ..')
})

const userRoutes = require('./routes/userRoutes')
app.use('/user' , userRoutes);

app.listen(PORT , ()=>console.log('Server started...'))