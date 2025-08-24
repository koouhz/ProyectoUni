const express = require('express');
const router = express.Router();

const conexion = require('./config/connection');

router.get('/computadoras', (req, res) => {
    const sql = 'SELECT * FROM TComputadoras';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error('Error al consultar TComputadoras:', err);
            return res.status(500).send('Error en la consulta de TComputadoras');
        }
        res.json(result); 
    });
});

module.exports = router;
