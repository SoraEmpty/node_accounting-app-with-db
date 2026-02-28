'use strict';

const express = require('express');
const cors = require('cors');
// Імпортуємо об'єкт models, який містить User, Expense, Category
const { models } = require('./models/models');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // --- CRUD ДЛЯ КАТЕГОРІЙ ---

  // GET ALL
  app.get('/categories', async (req, res) => {
    try {
      const categories = await models.Category.findAll({ order: [['id', 'ASC']] });
      res.status(200).json(categories);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  // GET ONE
  app.get('/categories/:id', async (req, res) => {
    try {
      const category = await models.Category.findByPk(req.params.id);

      if (!category) {
        return res.sendStatus(404);
      }
      res.status(200).json(category);
    } catch (err) {
      console.error(err);
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
      const newCategory = await models.Category.create({ name });
      res.status(201).json(newCategory);
    } catch (err) {
      console.error(err);
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
      const category = await models.Category.findByPk(req.params.id);

      if (!category) {
        return res.sendStatus(404);
      }

      category.name = name;
      await category.save();

      res.status(200).json(category);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  // DELETE
  app.delete('/categories/:id', async (req, res) => {
    try {
      const category = await models.Category.findByPk(req.params.id);

      if (!category) {
        return res.sendStatus(404);
      }

      await category.destroy();
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  return app;
}

module.exports = {
  createServer,
};
