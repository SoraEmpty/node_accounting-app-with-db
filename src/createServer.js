'use strict';

const express = require('express');
const { DataTypes } = require('sequelize');
const { sequelize } = require('./db'); // твій файл з налаштуванням Sequelize

// 1. Визначаємо модель Category
const Category = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'categories',
    timestamps: false, // вимикаємо createdAt/updatedAt для простоти
  },
);

function createServer() {
  const app = express();

  app.use(express.json());

  // Синхронізація моделей з базою (створить таблицю, якщо її немає)
  sequelize.sync();

  // --- CRUD ДЛЯ КАТЕГОРІЙ ---

  // GET ALL
  app.get('/categories', async (req, res) => {
    try {
      const categories = await Category.findAll({ order: [['id', 'ASC']] });

      res.status(200).json(categories);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  // GET ONE
  app.get('/categories/:id', async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);

      if (!category) {
        return res.sendStatus(404);
      }
      res.status(200).json(category);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  // POST (Create)
  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.sendStatus(400);
    }

    try {
      const newCategory = await Category.create({ name });

      res.status(201).json(newCategory);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  // PUT (Update)
  app.put('/categories/:id', async (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.sendStatus(400);
    }

    try {
      const category = await Category.findByPk(req.params.id);

      if (!category) {
        return res.sendStatus(404);
      }

      category.name = name;
      await category.save();

      res.status(200).json(category);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  // DELETE
  app.delete('/categories/:id', async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);

      if (!category) {
        return res.sendStatus(404);
      }

      await category.destroy();
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  return app;
}

module.exports = {
  createServer,
  Category,
};
