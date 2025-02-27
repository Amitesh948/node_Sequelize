'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Customers', [
      { name: 'Alice Johnson', email: 'alice@example.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bob Smith', email: 'bob@example.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Charlie Brown', email: 'charlie@example.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Diana Prince', email: 'diana@example.com', createdAt: new Date(), updatedAt: new Date() }
    ], {});

   
    const customers = await queryInterface.sequelize.query(`SELECT id FROM Customers;`);
    const customerRows = customers[0];

    
    await queryInterface.bulkInsert('Products', [
      { name: 'Laptop', price: 1200, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mouse', price: 50, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Keyboard', price: 80, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Monitor', price: 300, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Headphones', price: 150, createdAt: new Date(), updatedAt: new Date() }
    ], {});


    const products = await queryInterface.sequelize.query(`SELECT id FROM Products;`);
    const productRows = products[0];

    await queryInterface.bulkInsert('Orders', [
      { customerId: customerRows[0].id, totalAmount: 1300, createdAt: new Date(), updatedAt: new Date() },
      { customerId: customerRows[1].id, totalAmount: 350, createdAt: new Date(), updatedAt: new Date() },
      { customerId: customerRows[2].id, totalAmount: 80, createdAt: new Date(), updatedAt: new Date() },
      { customerId: customerRows[3].id, totalAmount: 1450, createdAt: new Date(), updatedAt: new Date() }
    ], {});

    const orders = await queryInterface.sequelize.query(`SELECT id FROM Orders;`);
    const orderRows = orders[0];

    await queryInterface.bulkInsert('OrderItems', [
      { orderId: orderRows[0].id, productId: productRows[0].id, quantity: 1, createdAt: new Date(), updatedAt: new Date() }, // Laptop
      { orderId: orderRows[1].id, productId: productRows[3].id, quantity: 1, createdAt: new Date(), updatedAt: new Date() }, // Monitor
      { orderId: orderRows[1].id, productId: productRows[1].id, quantity: 2, createdAt: new Date(), updatedAt: new Date() }, // 2 Mice
      { orderId: orderRows[2].id, productId: productRows[2].id, quantity: 1, createdAt: new Date(), updatedAt: new Date() }, // Keyboard
      { orderId: orderRows[3].id, productId: productRows[0].id, quantity: 1, createdAt: new Date(), updatedAt: new Date() }, // Laptop
      { orderId: orderRows[3].id, productId: productRows[4].id, quantity: 1, createdAt: new Date(), updatedAt: new Date() }  // Headphones
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OrderItems', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Customers', null, {});
  }
};
