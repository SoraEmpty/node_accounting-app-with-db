'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');
// 1. Імпортуй моделі з їх власних файлів
const { Expense } = require('./Expense.model.js');
const { Category } = require('./Category.model.js'); // Створи цей файл!

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  },
);

// 2. Встановлюй зв'язки ТУТ
User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

// Зв'язки для категорій (якщо потрібно)
Category.hasMany(Expense, { foreignKey: 'categoryId' });
Expense.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
