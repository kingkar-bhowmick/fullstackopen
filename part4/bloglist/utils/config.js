require('dotenv').config()



// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI

//Start Server
const PORT = process.env.PORT


module.exports = {
    MONGODB_URI, 
    PORT
}