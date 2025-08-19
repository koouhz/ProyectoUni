const express = require('express');
const router = express.Router();
const conexion = require('../../config/connection');

router.get('/reservas', (req, res) => {
    const sql = 'SELECT * FROM TReservas';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error('Error al consultar TReservas:', err);
            return res.status(500).send('Error en la consulta de TReservas');
        }
        res.json(result);
    });
});

module.exports = router;
