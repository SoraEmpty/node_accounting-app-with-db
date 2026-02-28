'use strict';

// Імпортуємо налаштування sequelize
const { sequelize } = require('../db.js');

// 1. Імпортуємо самі моделі з їх власних файлів
const { User } = require('./User.model.js');
const { Expense } = require('./Expense.model.js');
const { Category } = require('./Category.model.js');

// 2. Встановлюємо зв'язки (Associations)
// Один Користувач може мати багато Витрат
User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

// Одна Категорія може мати багато Витрат
Category.hasMany(Expense, { foreignKey: 'categoryId' });
Expense.belongsTo(Category, { foreignKey: 'categoryId' });

// 3. Експортуємо моделі та sequelize для використання у тестах та сервері
module.exports = {
  sequelize,
  models: {
    User,
    Expense,
    Category,
  },
};
