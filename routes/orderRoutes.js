const express = require('express');
const { createOrder,
    getOrdersWithCustomers,
    getOrdersWithProducts,
    getCustomersWithOrdersAndProducts,
    getLimitedOrders } = require('../controllers/orderController');
const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders-with-customers', getOrdersWithCustomers);
router.get('/orders-with-products', getOrdersWithProducts);
router.get('/customers-with-orders-products', getCustomersWithOrdersAndProducts);
router.get('/limited-orders', getLimitedOrders);

module.exports = router;
