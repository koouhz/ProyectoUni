const express = require('express');
const router = express.Router();

const conexion = require('../Public/connection');

router.get('/componentes', (req, res) => {
    const sql = 'SELECT * FROM TComponentes';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error('Error al consultar TComponentes:', err);
            return res.status(500).send('Error en la consulta de TComponentes');
        }
        res.json(result); 
    });
});

module.exports = router;
