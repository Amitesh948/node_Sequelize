'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Customer, { foreignKey: 'customerId' });
      Order.belongsToMany(models.Product, { through: models.OrderItem, foreignKey: 'orderId' });
    }
  }

  Order.init(
    {
      totalAmount: { type: DataTypes.FLOAT, allowNull: false },
      customerId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );

  return Order;
};
