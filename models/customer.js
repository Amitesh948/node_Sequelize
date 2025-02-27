'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true }
  });

  Customer.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });

  Customer.associate = (models) => {
    Customer.hasMany(models.Order, { foreignKey: 'customerId', onDelete: 'CASCADE' });
  };

  return Customer;
};