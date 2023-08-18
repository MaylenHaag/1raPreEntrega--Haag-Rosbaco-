import express from 'express'
import ProductManager from './ProductManager.js'

const app = express()
const productManager = new ProductManager('./data/products.json')

app.get('/products', async (req, res) => {
    const result = await productManager.getProducts()

    const limit = req.query.limit 

    if (typeof result == 'string') {
        const error = result.split(' ')

        const errorMessage = error.slice(1).join(' ')

        return res.status(parseInt(error[0].slice(1,4))).json({ error: errorMessage })
    }

    res.status(200).json({ payload: result.slice(0, limit)})
})

app.get('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);

    const result = await productManager.getProductById(pid)

    if (typeof result == 'string') {
        const error = result.split(' ')

        const errorMessage = error.slice(1).join(' ')

        return res.status(parseInt(error[0].slice(1,4))).json({ error: errorMessage })
    }

    res.status(200).json({ result})
})

app.listen(8080, () => console.log('Servicio cargado'))