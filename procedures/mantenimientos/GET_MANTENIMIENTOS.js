const express = require('express');
const router = express.Router();
const conexion = require('../../config/connection');

router.get('/mantenimientos', (req, res) => {
    const sql = 'SELECT * FROM TMantenimientos';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error('Error al consultar TMantenimientos:', err);
            return res.status(500).send('Error en la consulta de TMantenimientos');
        }
        res.json(result);
    });
});

module.exports = router;
