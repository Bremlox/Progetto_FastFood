const Meal = require('../models/Meal');

// Controller per gestire GET /api/meals
// Riceve tutte le richieste indirizzate a questa rotta ed è responsabile
// di rispondere con l'elenco dei piatti presenti nel database
exports.getAllMeals = async (req, res) => {
  try {
    // Meal.find({}) senza filtri restituisce TUTTI i documenti della collezione
    const meals = await Meal.find({});

    // Rispondiamo con status 200 (OK) e i dati in formato JSON
    res.status(200).json(meals);
  } catch (error) {
    // Se qualcosa va storto (es. connessione al DB persa), rispondiamo con
    // status 500 (Internal Server Error) e un messaggio comprensibile
    res.status(500).json({ messaggio: 'Errore nel recupero dei piatti', errore: error.message });
  }
};
// Controller per gestire GET /api/meals/category/:categoria
// Restituisce solo i piatti che appartengono alla categoria specificata nell'URL
exports.getMealsByCategory = async (req, res) => {
  try {
    const categoria = req.params.categoria;

    const meals = await Meal.find({ strCategory: categoria });

    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ messaggio: 'Errore nel recupero dei piatti per categoria', errore: error.message });
  }
};