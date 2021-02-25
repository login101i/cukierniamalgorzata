const app = require('./app.js')
const colors = require("colors")
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')


dotenv.config({ path: 'backend/config/config.env' })

connectDatabase()

app.listen(process.env.PORT, () => {
    console.log(`Server działa na porcie ${process.env.PORT} w statusie ${process.env.NODE_ENV} `.green.bold)
})