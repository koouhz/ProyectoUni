const express = require('express');
const router = express.Router();

const conexion = require('../Public/connection');

router.get('/roles', (req, res) => {
    const sql = 'SELECT Nombre, Estado FROM TRoles';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error('Error al consultar TRoles:', err);
            return res.status(500).send('Error en la consulta de TRoles');
        }
        res.json(result);
    });
});

module.exports = router;
