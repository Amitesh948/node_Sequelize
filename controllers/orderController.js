const { Order, Customer, Product, OrderItem } = require('../models');

  const createOrder = async (req, res) => {
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

const getOrdersWithCustomers = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Customer, attributes: ['id', 'name', 'email'] }]
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

const getOrdersWithProducts = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ 
        model: Product,
        through: { attributes: ['quantity'] }, 
        attributes: ['id', 'name', 'price']
      }]
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders with products', error });
  }
};

const getCustomersWithOrdersAndProducts = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: [{
        model: Order,
        include: [{
          model: Product,
          through: { attributes: ['quantity'] },
          attributes: ['id', 'name', 'price']
        }]
      }]
    });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers with orders', error });
  }
};

const getLimitedOrders = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;

    const orders = await Order.findAll({
      include: [{ model: Customer }],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching limited orders', error });
  }
};

module.exports = { 
  createOrder,
  getOrdersWithCustomers, 
  getOrdersWithProducts, 
  getCustomersWithOrdersAndProducts, 
  getLimitedOrders 
};
