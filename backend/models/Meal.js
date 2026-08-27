const mongoose = require('mongoose');
/*Importa la libreria Mongoose nel file. Senza questa riga, non 
potresti usare nessuna delle funzioni per interagire con MongoDB.*/

/*Qui stai creando un nuovo oggetto Schema. È la definizione 
di quali campi avrà un piatto (es. nome, categoria, ecc.).*/
const mealSchema = new mongoose.Schema({
    idMeal: String,
    /*Il nome del pasto. È di tipo stringa e required: true significa 
    che non puoi salvare un pasto nel database se non gli dai un nome.*/
    strMeal: { type: String, required: true },
    
    /*Tutte queste sono stringhe opzionali che descrivono 
    il piatto (categoria, area geografica, istruzioni, ecc.).*/
    strMealAlternate: String, 
    strCategory: String,
    strArea: String,
    strInstructions: String,
    strMealThumb: String,
    strTags: String,          
    strYoutube: String,
    strSource: String,
    strImageSource: String,   
    strCreativeCommonsConfirmed: String, 
    dateModified: Date,
    
    /*Le parentesi quadre indicano un Array. Significa che questo campo 
    conterrà una lista di stringhe (es. ["Pasta", "Pomodoro", "Basilico"]).*/
    ingredients: [String],    
    measures: [String],
    
    /*il prezzo è un numero. Se non specifichi un prezzo quando 
    crei il pasto, Mongoose userà automaticamente 9.99.*/       
    price: { type: Number, default: 9.99 }
}, { 
/*timestamps: true: Mongoose aggiungerà automaticamente due campi: 
createdAt (quando è stato creato il record) e updatedAt (l'ultima volta che è 
stato modificato).*/
    timestamps: true 
});
/*Questa riga "compila" lo schema in un Modello chiamato 'Meal' e lo esporta. 
Il Modello è quello che userai nel resto dell'app per fare operazioni come 
Meal.find() o Meal.create().*/
module.exports = mongoose.model('Meal', mealSchema);