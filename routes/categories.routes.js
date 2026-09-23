const express = require('express');
const router = express.Router();

let categories = [
{
id: 1,
name: "Programming"
},
{
id: 2,
name: "Database"
},
{
id: 3,
name: "Networking"
}
];

router.get('/', (req, res) => {
let result = categories;

if (req.query.name) {
    result = categories.filter(category =>
        category.name.toLowerCase().includes(req.query.name.toLowerCase())
    );
}

res.status(200).json({
    success: true,
    data: result,
    meta: {
        count: result.length
    }
});
});

router.get('/:id', (req, res) => {
const id = Number(req.params.id);

const category = categories.find(category => category.id === id);

if (!category) {
    return res.status(404).json({
        success: false,
        message: "Category not found"
    });
}

res.status(200).json({
    success: true,
    data: category
});
});

module.exports = router;