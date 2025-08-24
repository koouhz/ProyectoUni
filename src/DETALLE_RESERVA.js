const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/DetalleReserva', (req, res) => {
    const sql = 'SELECT * FROM TDetalleReserva';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error('Error al consultar TDetalleReserva:', err);
            return res.status(500).send('Error en la consulta de TDetalleReserva');
        }
        res.json(result);
    });
});

module.exports = router;
