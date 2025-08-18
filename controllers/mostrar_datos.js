const connection = require('../database/db');

const obtenerUsuarios = (callback) => {
  const query = 'CALL sp_obtener_usuarios()';
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err.message);
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

module.exports = { obtenerUsuarios };