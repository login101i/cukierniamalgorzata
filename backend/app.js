const express=require('express')

const app=express() 


// importuję routy
app.use(express.json())
const products=require('./routes/products')


app.use('/api/v1', products)

module.exports=app