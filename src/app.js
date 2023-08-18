import express from 'express'
import productRouter from './routers/products.router.js'


const app = express()

app.use('/products', productRouter)

app.listen(8080, () => console.log('Servicio cargado'))