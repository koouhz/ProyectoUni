const express = require('express');
const router = express.Router();

const conexion = require('./config/connection');

router.get('/categorias', (req, res) => {
    const sql = 'SELECT * FROM TCategorias';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error('Error al consultar TCategorias:', err);
            return res.status(500).send('Error en la consulta de TCategorias');
        }
        res.json(result);
    });
});

module.exports = router;
