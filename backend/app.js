const express=require('express')

const app=express() 
const errrorMiddleware = require('./middlewares/errors')
const cookieParser=require('cookie-parser')



// importuję routy
app.use(express.json())
app.use(cookieParser())
const products=require('./routes/products')
const auth=require('./routes/auth')


app.use('/api/v1', products)
app.use('/api/v1', auth)



app.use(errrorMiddleware)

module.exports=app