const express = require('express');
const { createProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/products', createProduct);

module.exports = router;
