const express = require('express');
const { dbConnection } = require('./database/conexion');
require('dotenv').config();
const cors = require('cors');


//Crear el servidor de express
const app = express();


//Configurar CORS
app.use(cors());
//Base de datos
dbConnection();

//Rutas 
app.get('/', (req,res)=>{

    res.json({
        ok:true,
        msg: 'Hola Mundo 3'

    });

});

app.listen(3000,() =>{

    console.log('Servidor corriendo en el puerto' + 3000 );

})


