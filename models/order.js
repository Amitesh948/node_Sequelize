'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    totalAmount: { type: DataTypes.FLOAT, allowNull: false }
  });


  Order.init({
    totalAmount: DataTypes.FLOAT,
    customerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  
  Order.associate = (models) => {
    Order.belongsTo(models.Customer, { foreignKey: 'customerId' });
    Order.belongsToMany(models.Product, { through: models.OrderItem, foreignKey: 'orderId' });
  };

  return Order;
};