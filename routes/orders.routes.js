const express = require('express');
const router = express.Router();

// In-memory mock data
let orders = [
  { id: 1, customer: "Juan Dela Cruz", status: "pending", total: 500 },
  { id: 2, customer: "Maria Santos", status: "completed", total: 1200 }
];
let nextId = 3;

// GET /api/orders  (supports ?status=pending style filtering)
router.get('/', (req, res) => {
  let result = orders;
  const { status } = req.query;

  if (status) {
    result = result.filter(o => o.status === status);
  }

  res.status(200).json({
    success: true,
    data: result,
    meta: {
      timestamp: new Date().toISOString(),
      count: result.length
    }
  });
});

// GET /api/orders/:id
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === Number(req.params.id));

  if (!order) {
    return res.status(404).json({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Order not found."
      }
    });
  }

  res.status(200).json({
    success: true,
    data: order,
    meta: {
      timestamp: new Date().toISOString(),
      count: 1
    }
  });
});
