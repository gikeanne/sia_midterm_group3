const express = require('express')

const router = express.Router()

let users = [
    {
        id: 1,
        name: 'Gianne',
        email: 'gianne@gmail.com'
    },
    {
        id: 2,
        name: 'Marco',
        email: 'marco@gmail.com'
    }
]

// GET all users
router.get('/', (req, res) => {

    let result = users

    if (req.query.name) {
        result = users.filter(user =>
            user.name.toLowerCase().includes(req.query.name.toLowerCase())
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

// GET user by ID
router.get('/:id', (req, res) => {

    const user = users.find(
        user => user.id === Number(req.params.id)
    )

    if (!user) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'User not found.'
            }
        })
    }

    res.status(200).json({
        success: true,
        data: user,
        meta: {
            timestamp: new Date().toISOString(),
            count: 1
        }
    })
})

// POST new user
router.post('/', (req, res) => {

    const { name, email } = req.body

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'BAD_REQUEST',
                message: 'Name and email are required.'
            }
        })
    }

    const newUser = {
        id: users.length + 1,
        name: name,
        email: email
    }

    users.push(newUser)

    res.status(201).json({
        success: true,
        data: newUser,
        meta: {
            timestamp: new Date().toISOString(),
            count: 1
        }
    })
})

// DELETE user
router.delete('/:id', (req, res) => {

    const id = Number(req.params.id)

    const index = users.findIndex(user => user.id === id)

    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'User not found.'
            }
        })
    }

    users.splice(index, 1)

    res.status(204).send()
})

module.exports = router