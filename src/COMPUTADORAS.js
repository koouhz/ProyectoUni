const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/computadoras', (req, res) => {
    const sql = 'SELECT * FROM TComputadoras';
    conexion.query(sql, (err, result) => {
        if (err) return res.status(500).send('Error en la consulta de TComputadoras');
        res.json(result);
    });
});

router.post('/computadoras', (req, res) => {
    const { idusuario, nombre } = req.body;
    const data = { idusuario, nombre };
    const sqlInsert = 'INSERT INTO TComputadoras SET ?';
    conexion.query(sqlInsert, data, (err, result) => {
        if (err) return res.status(500).send('Error al insertar computadora');
        res.json({ 
            message: 'Computadora agregada correctamente', 
            id: result.insertId 
        });
    });
});

router.put('/computadoras/:id', (req, res) => {
    const id = req.params.id;
    const { idusuario, nombre } = req.body;
    const sql = 'UPDATE TComputadoras SET idusuario = ?, nombre = ? WHERE idcomputadora = ?';
    conexion.query(sql, [idusuario, nombre, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar computadora');
        res.json({ message: 'Computadora actualizada correctamente' });
    });
});

router.delete('/computadoras/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TComputadoras SET estado = 0 WHERE idcomputadora = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar computadora');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Computadora no encontrada' });
        res.json({ message: 'Computadora eliminada (borrado lógico)' });
    });
});

module.exports = router;