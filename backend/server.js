const app = require('./app.js')
const colors = require("colors")
const dotenv = require('dotenv')
const connectDatabase = require('./config/dataBase')
const cloudinary = require('cloudinary')




// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Wyłączam server bo pojawił się w app.js uncaught exception, np wprowadziłeś zmienną, która nie jest zdefiniowana.');
    process.exit(1)
})

// Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })


dotenv.config({ path:'backend/config/config.env' })

connectDatabase()

// Wpisujemy gdy tworzymy komponenty na frontEndzie np component Register
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server działa na porcie ${process.env.PORT} w statusie ${process.env.NODE_ENV} `.green.bold)
})


// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Wyłączono server bo jest unhandled promise rejections, np w adresie do mongoDB jest literówka..');
    server.close(() => {
        process.exit(1)
        // cg czemu 1 to nie wiem
    })
})
