//mysql

var mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'reserva',
    user: 'root',
    password: ''
})


conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('conexion exitosa')
    }
})


module.exports = { conexion}