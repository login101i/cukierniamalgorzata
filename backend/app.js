const express=require('express')

const app=express() 
const errrorMiddleware = require('./middlewares/errors')



// importuję routy
app.use(express.json())
const products=require('./routes/products')


app.use('/api/v1', products)



app.use(errrorMiddleware)

module.exports=app