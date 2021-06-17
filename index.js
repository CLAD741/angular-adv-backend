const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./db/config');
const cors = require('cors');



const app = express();
app.use(cors());


//parser
app.use(express.json());
dbConnection();


app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));

app.get('/',(req,res)=>{
    res.json({
        ok:true,
        msg: 'Hola mundo'
    })
});

app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo');
});

