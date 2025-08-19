const express = require('express');
const router = express.Router();
const conexion = require('../../config/connection');

router.get('/DetalleEnsamble', (req, res) => {
    const sql = 'SELECT * FROM TDetalleEnsamble';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error('Error al consultar TDetalleEnsamble:', err);
            return res.status(500).send('Error en la consulta de TDetalleEnsamble');
        }
        res.json(result);
    });
});

module.exports = router;
