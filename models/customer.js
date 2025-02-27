'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Order, { foreignKey: 'customerId', onDelete: 'CASCADE' });
    }
  }

  Customer.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true }
    },
    {
      sequelize,
      modelName: 'Customer',
    }
  );

  return Customer;
};
