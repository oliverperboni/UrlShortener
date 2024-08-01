const mongoose = require('mongoose');
const { urlSchema, User } = require('../models/models');




async function connectToDb(DBName) {
    try {
        await mongoose.connect('mongodb://localhost:27017/' + DBName, {

        });
        console.log('Conectado ao MongoDB');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
    }
}


module.exports = {
    connectToDb,
};
