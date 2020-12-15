const express = require('express');
const { dbConnection } = require('./database/conexion');
require('dotenv').config();
const cors = require('cors');


//Crear el servidor de express
const app = express();

//Configurar CORS (middleware)
app.use(cors());
//Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();

//Rutas (middleware)
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT,() =>{

    console.log('Servidor corriendo en el puerto' + process.env.PORT  );

})


