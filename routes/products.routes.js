const express = require('express')

const router = express. Router() 

let products = [

{

id: 1,
name: 'Smartphone',
price: 7000

},

{

id: 2,
name: 'LCD',
price: 500

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
