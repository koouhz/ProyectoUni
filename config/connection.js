const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: '192.168.0.43',
    user: 'kike',
    password: '1992',
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
