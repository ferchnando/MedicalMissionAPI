require('dotenv').config();

module.exports = {
    database:{
        URI: process.env.MONGODB_URI
    },
    key:{
        SECRET: process.env.SECRET
    }
}