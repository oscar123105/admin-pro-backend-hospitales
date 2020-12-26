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

//Directorio publico
app.use(express.static('public'));

//Rutas (middleware)
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));


app.listen(process.env.PORT,() =>{

    console.log('Servidor corriendo en el puerto' + process.env.PORT  );

})


