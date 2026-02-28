'use strict';

const { sequelize } = require('../db.js');
const { User } = require('./User.model.js');
const { Expense } = require('./Expense.model.js');
const { Category } = require('./Category.model.js');

// Встановлення зв'язків
User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Expense, { foreignKey: 'categoryId' });
Expense.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = {
  sequelize,
  models: {
    User,
    Expense,
    Category,
  },
};
