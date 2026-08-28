const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

// Quando arriva una richiesta GET su "/" (che diventerà "/api/meals" 
// una volta collegata in server.js), esegui getAllMeals
router.get('/', mealController.getAllMeals);
router.get('/category/:categoria', mealController.getMealsByCategory);
router.get('/search/:strMeal', mealController.getMealsByName);
router.get('/:id', mealController.getMealById);


module.exports = router;