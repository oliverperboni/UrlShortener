const express = require('express');
const urlRoutes = require('./router/urlRouter.js');
const { connectToDb, } = require('./config/config');
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

async function startServer() {
  try {
    await connectToDb("urlShort");

    app.use('/api', urlRoutes);

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();
