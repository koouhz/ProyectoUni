const express = require('express');
const router = express.Router();

const conexion = require('../../config/connection');

router.get('/usuarios', (req, res) => {
    const sql = 'SELECT nombre FROM TUsuarios';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error('Error al consultar TUsuarios:', err);
            return res.status(500).send('Error en la consulta de TUsuarios');
        }
        res.json(result); 
    });
});

module.exports = router;
