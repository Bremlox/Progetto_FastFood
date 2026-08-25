require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middleware per permettere a Express di leggere i payload in formato JSON
app.use(express.json());

// Connessione a MongoDB Atlas tramite Mongoose
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connesso con successo a MongoDB Atlas!');
    
    // Avvia il server solo dopo aver stabilito la connessione al database
    app.listen(port, () => {
      console.log(`🚀 Server FastFood in ascolto sulla porta ${port}`);
    });
  })
  .catch((error) => {
    console.error('❌ Errore critico di connessione a MongoDB:', error.message);
  });