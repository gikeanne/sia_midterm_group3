const express = require('express')

const router = express.Router()

let categories = [
{
id: '1',
name: 'Electronics',
description: 'Electronic products'
},
{
id: '2',
name: 'Clothing',
description: 'Clothes and fashion products'
},
{
id: '3',
name: 'Food',
description: 'Food and grocery products'
}
]

router.get('/', (req, res) => {
let result = categories

if (req.query.name) {
    result = categories.filter(category =>
        category.name.toLowerCase() === req.query.name.toLowerCase()
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

router.get('/:id', (req, res) => {
const category = categories.find(
category => category.id === req.params.id
)

if (!category) {
    return res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: 'Category not found.'
        }
    })
}

res.status(200).json({
    success: true,
    data: [category],
    meta: {
        timestamp: new Date().toISOString(),
        count: 1
    }
})
})

router.post('/', (req, res) => {
const { name, description } = req.body

if (!name || !description) {
    return res.status(400).json({
        success: false,
        error: {
            code: 'BAD_REQUEST',
            message: 'Name and description are required.'
        }
    })
}

const newCategory = {
    id: Date.now().toString(),
    name: name,
    description: description
}

categories.push(newCategory)

res.status(201).json({
    success: true,
    data: [newCategory],
    meta: {
        timestamp: new Date().toISOString(),
        count: 1
    }
})
})

router.delete('/:id', (req, res) => {
const index = categories.findIndex(
category => category.id === req.params.id
)

if (index === -1) {
    return res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: 'Category not found.'
        }
    })
}

categories.splice(index, 1)

res.status(204).send()
})

module.exports = router