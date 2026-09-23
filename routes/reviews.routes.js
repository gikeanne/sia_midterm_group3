const express = require('express')

const router = express.Router()

let reviews = [
    {
        id: 1,
        customer: 'Gianne',
        rating: 5,
        comment: 'Great product!'
    },
    {
        id: 2,
        customer: 'Marco',
        rating: 4,
        comment: 'Good product.'
    }
]

// GET all reviews
router.get('/', (req, res) => {

    let result = reviews

    if (req.query.customer) {
        result = reviews.filter(review =>
            review.customer.toLowerCase().includes(req.query.customer.toLowerCase())
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

// GET review by ID
router.get('/:id', (req, res) => {

    const review = reviews.find(
        review => review.id === Number(req.params.id)
    )

    if (!review) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'Review not found.'
            }
        })
    }

    res.status(200).json({
        success: true,
        data: review,
        meta: {
            timestamp: new Date().toISOString(),
            count: 1
        }
    })
})

// POST review
router.post('/', (req, res) => {

    const { customer, rating, comment } = req.body

    if (!customer || rating === undefined || !comment) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'BAD_REQUEST',
                message: 'Customer, rating, and comment are required.'
            }
        })
    }

    const newReview = {
        id: reviews.length + 1,
        customer: customer,
        rating: rating,
        comment: comment
    }

    reviews.push(newReview)

    res.status(201).json({
        success: true,
        data: newReview,
        meta: {
            timestamp: new Date().toISOString(),
            count: 1
        }
    })
})

// DELETE review
router.delete('/:id', (req, res) => {

    const id = Number(req.params.id)

    const index = reviews.findIndex(review => review.id === id)

    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'Review not found.'
            }
        })
    }

    reviews.splice(index, 1)

    res.status(204).send()
})

module.exports = router