const connection = require('../database/db');

const obtenerUsuarios = (callback) => {
  const query = `
    SELECT 
        u.IdUsuario,
        u.Nombre,
        u.Apellido1,
        u.Correo,
        r.Nombre AS Rol,
        u.Estado,
        u.FechaRegistro
    FROM TUsuarios u
    INNER JOIN TRoles r ON u.IdRol = r.IdRol
    WHERE u.Estado = 1
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err.message);
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = { obtenerUsuarios };