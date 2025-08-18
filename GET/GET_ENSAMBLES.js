const express = require('express');
const router = express.Router();

const conexion = require('../Public/connection');

router.get('/ensambles', (req, res) => {
    const sql = 'SELECT * FROM TEnsambles';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error('Error al consultar TEnsambles:', err);
            return res.status(500).send('Error en la consulta de TEnsambles');
        }
        res.json(result);
    });
});

module.exports = router;
