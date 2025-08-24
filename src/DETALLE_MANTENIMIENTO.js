const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/detallesmantenimiento', (req, res) => {
    const sql = 'SELECT * FROM TDetalleMantenimiento';
    conexion.query(sql, (err, result) => {
        if (err) return res.status(500).send('Error en la consulta de TDetalleMantenimiento');
        res.json(result);
    });
});

router.post('/detallesmantenimiento', (req, res) => {
    const { idmantenimiento, idcomponente } = req.body;
    const sqlSelect = 'SELECT IFNULL(MAX(iddetalle), 0) + 1 AS nuevoId FROM TDetalleMantenimiento';
    conexion.query(sqlSelect, (err, result) => {
        if (err) return res.status(500).send('Error al generar nuevo id');
        const nuevoId = result[0].nuevoId;
        const data = { iddetalle: nuevoId, idmantenimiento, idcomponente };
        const sqlInsert = 'INSERT INTO TDetalleMantenimiento SET ?';
        conexion.query(sqlInsert, data, (err2) => {
            if (err2) return res.status(500).send('Error al insertar detalle de mantenimiento');
            res.json({ message: 'Detalle de mantenimiento agregado correctamente', id: nuevoId });
        });
    });
});

router.put('/detallesmantenimiento/:id', (req, res) => {
    const id = req.params.id;
    const { idmantenimiento, idcomponente } = req.body;
    const sql = 'UPDATE TDetalleMantenimiento SET idmantenimiento = ?, idcomponente = ? WHERE iddetalle = ?';
    conexion.query(sql, [idmantenimiento, idcomponente, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar detalle de mantenimiento');
        res.json({ message: 'Detalle de mantenimiento actualizado correctamente' });
    });
});

router.delete('/detallesmantenimiento/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TDetalleMantenimiento SET estadologico = 0 WHERE iddetalle = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar detalle de mantenimiento');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalle de mantenimiento no encontrado' });
        res.json({ message: 'Detalle de mantenimiento eliminado (borrado lógico)' });
    });
});

module.exports = router;
