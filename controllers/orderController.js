const { Order, OrderItem, Product } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { customerId, products } = req.body;
    
    const totalAmount = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({ customerId, totalAmount });

    const orderItems = products.map(product => ({
      orderId: order.id,
      productId: product.id,
      quantity: product.quantity
    }));
    
    await OrderItem.bulkCreate(orderItems);
    
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
