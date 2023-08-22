import fs from 'fs'
import express from 'express'
import productRouter from './routers/product.router.js'
import cartsRouter from './routers/cart.router.js'
import ProductManager from './ProductManager.js'

const path = "./data/products.json"

const init = async () => {
    if (!fs.existsSync(path)) {
      await fs.promises.writeFile(path, JSON.stringify([], null));
    }
}

init()

const productManager = new ProductManager(path)

let data = await fs.promises.readFile(path, "utf-8")
let products = JSON.parse(data)

const app = express()

app.use(express.json())
app.use('/', express.static('../public'))
app.use(express.urlencoded({extended: true}))


app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)

app.listen(8080, () => console.log('Servicio cargado'))