const express = require('express');
const router = express.Router();

// In-memory mock data
let orders = [
  { id: 1, customer: "Juan Dela Cruz", status: "pending", total: 500 },
  { id: 2, customer: "Maria Santos", status: "completed", total: 1200 }
];
let nextId = 3;

