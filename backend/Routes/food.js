const express = require('express');
const router = express.Router();
const Food = require('../Schema/FoodSchema.js');
const FoodCategory = require('../Schema/FoodCategory.js');
const AdminAuth = require('../middleware/AdminAuth.js');

router.post('/setfood', AdminAuth, async (req, res) => {
  try {
    const { foodName, category, price, image } = req.body;

    let food = await Food.create({
      foodName,
      category,
      price,
      image,
    });

    let cateFind = await FoodCategory.findOne({ category });
    if (!cateFind) {
      await FoodCategory.create({
        category,
      });
    }

    if (food) {
      res.status(200).json({
        status: 200,
        message: 'Food uploaded',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

router.get('/food', async (req, res) => {
  try {
    let foodItem = await Food.find();
    let foodCategory = await FoodCategory.find();
    res.send([foodItem, foodCategory]);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

router.delete('/deletefood/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let deleteItem = await Food.findByIdAndDelete(id);
    if (deleteItem) {
      res.status(200).json({
        status: 200,
        message: 'Item deleted successfully',
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'Item not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

module.exports = router;
