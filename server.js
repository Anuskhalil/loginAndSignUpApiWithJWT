const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.SERVER_PORT ||  5001
app.use(express.json())
app.use('/api', require('./api/Users/Router'))

// const mongoose = require('mongoose')


// try {
//     mongoose.connect(process.env.MONGO_URL)
//     console.log("DB is Connected")
    
// } catch (error) {
//     console.log("Error")
// }







app.listen(port, ()=> {
    console.log(`Example app listening on port ${port}`)
})