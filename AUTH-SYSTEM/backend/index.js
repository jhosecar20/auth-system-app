console.log("mi primera app en express.js")
require('dotenv').config()
const express = require('express')
const { corsMiddleware } = require('./shared/middeware/cors')
const { testConnection } = require('./config/database')

const app = express()
const PORT = process.env.PORT || 3001
app.use(express.json())
app.use(corsMiddleware);

const initializeDatabase = async()=>
{
    await testConnection();
}
app.get('/', (req, res) => {
    console.log(`sistema de login funcionando correctamente en el puerto ${PORT}`);
    res.json({message: 'sistema de login funcionando correctamente',
        timeStamp: new Date().toISOString(),
        status: 'success'
    })
})

// login
/*
*/
app.use ('/api/vl',require('./routes/auth'));

const startServer =  async() => {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

startServer();
