const express = require('express')

const router = express. Router() 

let products = [

{

id: 1,
name: 'Laptop',
price: 45000

},

{

id: 2,
name: 'Keyboard',
price: 1500

}

]

// GET all products
router.get('/', (req, res) => {

let result = products

if (req.query.name) {
result =
products.filter (product =>

product.name.toLowerCase().includes (req.query.name.toLowerCase())

)

}

res.status(200).json({
success: true,
data: result,
meta: {

timestamp: new
Date().toISOString(),
count: result.length

}

})

})

 // GET product by ID

router.get('/:id', (req, res) => {

const product = products.find(
product => product.id ===
Number (req.params.id)

)

if (!product) {
return res.status(404).json({
success: false,
error:{
code: 'NOT_FOUND',
message: 'Product not found.'

}

})

}

res.status(200).json({
success: true,
data: product,
meta: {

timestamp: new
Date().toISOString(),
count: 1
}

})

})

  // POST product
router.post('/', (req, res) => {

    const { name, price } = req.body

    if (!name || price === undefined) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'BAD_REQUEST',
                message: 'Name and price are required.'
            }
        })
    }

    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price
    }

    products.push(newProduct)

    res.status(201).json({
        success: true,
        data: newProduct,
        meta: {
            timestamp: new Date().toISOString(),
            count: 1
        }
    })
})

// DELETE product
router.delete('/:id', (req, res) => {

    const id = Number(req.params.id)

    const index = products.findIndex(product => product.id === id)

    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'Product not found.'
            }
        })
    }

    products.splice(index, 1)

    res.status(204).send()
})

module.exports = router