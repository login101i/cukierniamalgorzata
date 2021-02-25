const app = require('./app.js')


const dotenv = require('dotenv')
dotenv.config({ path: 'backend/config/config.env' })

app.listen(process.env.PORT, () => {
    console.log(`Server Działa na porcie ${process.env.PORT} w statusie ${process.env.NODE_ENV}`)
})