require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Meal = require('../models/Meal');

// Costruiamo il percorso assoluto al file JSON
const filePath = path.join(__dirname, '..', '..', 'docs', 'meals 1.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const meals = JSON.parse(rawData);

async function seed() {
  try {
    // 1. Connessione al database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connesso a MongoDB Atlas');

    let inseriti = 0;
    let aggiornati = 0;

    // 2. Per ogni piatto nel JSON, facciamo un upsert
    for (const meal of meals) {
      // Convertiamo il formato { $oid: "..." } in un vero ObjectId di Mongoose
      const objectId = new mongoose.Types.ObjectId(meal._id.$oid);

      // Costruiamo l'oggetto da salvare, escludendo il campo _id originale
      // (che gestiamo separatamente nel filtro dell'upsert)
      const { _id, ...datiPiatto } = meal;

      const risultato = await Meal.updateOne(
        { _id: objectId },           // filtro: cerca un documento con questo _id
        { $set: datiPiatto },        // dati da scrivere/aggiornare
        { upsert: true }             // se non esiste, crealo
      );

      if (risultato.upsertedCount > 0) {
        inseriti++;
      } else if (risultato.modifiedCount > 0) {
        aggiornati++;
      }
    }

    console.log(`🌱 Seed completato: ${inseriti} piatti inseriti, ${aggiornati} aggiornati (su ${meals.length} totali).`);
  } catch (error) {
    console.error('❌ Errore durante il seed:', error.message);
  } finally {
    // 3. Chiudiamo la connessione, altrimenti lo script non termina mai
    await mongoose.disconnect();
    console.log('🔌 Disconnesso da MongoDB');
  }
}

seed();