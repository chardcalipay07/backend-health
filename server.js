const express = require('express');
const cors =  require('cors')
const mongoose = require('mongoose')

const HealthRouter = require('./routes/health')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleWare
app.use(cors())
app.use(express.json())

//mongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri)

//Router
app.use('/health', HealthRouter)

const connection = mongoose.connection
connection.once('open', () => {
    console.log("MonggoDB database connection is established.")
})

app.listen(port, () => {
    console.log(`Server is running in port: ${port}`)
})