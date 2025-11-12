console.log("mi primera app en express.js");
require('dotenv').config();
const express = require('express');
const { corsMiddleware } = require('./shared/middleware/cors'); 
const { testConnection } = require('./config/database');
const { syncModels } = require('./shared/utils');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(corsMiddleware);

// Ruta de prueba
app.get('/', (req, res) => {
  console.log(` Sistema de login funcionando correctamente en el puerto ${PORT}`);
  res.json({
    message: 'Sistema de login funcionando correctamente',
    timeStamp: new Date().toISOString(),
    status: 'success',
  });
});

// Rutas de autenticación
app.use('/api/v1', require('./routes/auth')); 

const initializeDatabase = async () => {
  await testConnection();
  await syncModels();
};

const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' Error al iniciar el servidor:', error);
  }
};

startServer();