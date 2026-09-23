const express = require('express')

const router = express.Router()

let orders = [
    {
        id: 1,
        customer: 'Gianne',
        product: 'Laptop'
    },
    {
        id: 2,
        customer: 'Marco',
        product: 'Keyboard'
    }
]

// GET all orders
router.get('/', (req, res) => {

    let result = orders

    if (req.query.customer) {
        result = orders.filter(order =>
            order.customer.toLowerCase().includes(req.query.customer.toLowerCase())
        )
    }

    res.status(200).json({
        success: true,
        data: result,
        meta: {
            timestamp: new Date().toISOString(),
            count: result.length
        }
    })
})

// GET order by ID
router.get('/:id', (req, res) => {

    const order = orders.find(
        order => order.id === Number(req.params.id)
    )

    if (!order) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'Order not found.'
            }
        })
    }

    res.status(200).json({
        success: true,
        data: order,
        meta: {
            timestamp: new Date().toISOString(),
            count: 1
        }
    })
})

// POST order
router.post('/', (req, res) => {

    const { customer, product } = req.body

    if (!customer || !product) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'BAD_REQUEST',
                message: 'Customer and product are required.'
            }
        })
    }

    const newOrder = {
        id: orders.length + 1,
        customer: customer,
        product: product
    }

    orders.push(newOrder)

    res.status(201).json({
        success: true,
        data: newOrder,
        meta: {
            timestamp: new Date().toISOString(),
            count: 1
        }
    })
})

// DELETE order
router.delete('/:id', (req, res) => {

    const id = Number(req.params.id)

    const index = orders.findIndex(order => order.id === id)

    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'Order not found.'
            }
        })
    }

    orders.splice(index, 1)

    res.status(204).send()
})

module.exports = router