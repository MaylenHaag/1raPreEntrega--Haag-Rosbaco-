import { Router } from 'express'
import CartManager from '../cartManager.js'

const cartsRouter = Router()
const cartManager = new CartManager('./data/carts.json')

cartsRouter.post('/', async (req, res) => {
    const result = await cartManager.createCart()

    if (typeof result == 'string') {
        const error = result.split(' ')
        const errorMessage = error.slice(1).join(' ')

        return res.status(parseInt(error[0].slice(1,4))).json({ error: errorMessage })
    }

    res.status(201).json({ status: 'success', payload: result })
})

cartsRouter.get('/:cid', async (req, res) => {
    const cid = parseInt(req.params.cid)
    const result = await cartManager.getProductsFromCart(cid)

    if (typeof result == 'string') {
        const error = result.split(' ')
        const errorMessage = error.slice(1).join(' ')

        return res.status(parseInt(error[0].slice(1,4))).json({ error: errorMessage })
    }

    res.status(200).json({ status: 'success', payload: result })
})

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const result = await cartManager.addProductToCart(cid, pid)

    if (typeof result == 'string') {
        const error = result.split(' ')
        const errorMessage = error.slice(1).join(' ')

        return res.status(parseInt(error[0].slice(1,4))).json({ error: errorMessage })
    }

    res.status(200).json({ status: 'success', payload: result })
})

export default cartsRouter