const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/DetalleMantenimiento', (req, res) => {
    const sql = 'SELECT * FROM TDetalleMantenimiento';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error('Error al consultar TDetalleMantenimiento:', err);
            return res.status(500).send('Error en la consulta de TDetalleMantenimiento');
        }
        res.json(result);
    });
});

module.exports = router;
