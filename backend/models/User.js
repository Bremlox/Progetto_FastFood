/* Importa la libreria Mongoose nel file. Senza questa riga, non potresti 
usare nessuna delle funzioni per interagire con MongoDB. */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    /* Il nome dell'utente, obbligatorio. */
    nomeUtente: { type: String, required: true },
    
    /* L'indirizzo email. unique: true è fondamentale: assicura che non 
    ci siano mai due utenti con la stessa email nel database. */
    email: { type: String, required: true, unique: true },
    
    /* La password, obbligatoria. */
    password: { type: String, required: true },
    
    /* L'enum definisce i ruoli previsti dal progetto FastFood. 
    Accetta solo 'Cliente' o 'Ristoratore', con default 'Cliente'. */
    ruolo: { 
        type: String, 
        enum: ['Cliente', 'Ristoratore'], 
        default: 'Cliente' 
    },
    
    /* Un campo data che prende automaticamente l'ora esatta del momento 
    in cui l'utente viene registrato. */
    dataCreazione: { type: Date, default: Date.now }
});

/* Esporta il modello 'User' per poterlo usare altrove (ad esempio nelle 
rotte di login o registrazione). */
module.exports = mongoose.model('User', userSchema);