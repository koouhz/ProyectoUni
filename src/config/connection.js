const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Btwijhosss..123',
    database: 'Proyecto'
});

conexion.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        throw err;
    } else {
        console.log('Conexión a la base de datos exitosa');
    }
});

module.exports = conexion;
