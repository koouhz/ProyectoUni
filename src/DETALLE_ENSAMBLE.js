const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/detalleensamble', (req, res) => {
    const sql = 'SELECT * FROM TDetalleEnsamble';
    conexion.query(sql, (err, result) => {
        if (err) return res.status(500).send('Error en la consulta de TDetalleEnsamble');
        res.json(result);
    });
});

router.post('/detalleensamble', (req, res) => {
    const { idensamble, idcomponente } = req.body;
    const sqlSelect = 'SELECT IFNULL(MAX(iddetalle), 0) + 1 AS nuevoId FROM TDetalleEnsamble';
    conexion.query(sqlSelect, (err, result) => {
        if (err) return res.status(500).send('Error al generar nuevo id');
        const nuevoId = result[0].nuevoId;
        const data = { iddetalle: nuevoId, idensamble, idcomponente };
        const sqlInsert = 'INSERT INTO TDetalleEnsamble SET ?';
        conexion.query(sqlInsert, data, (err2) => {
            if (err2) return res.status(500).send('Error al insertar detalle de ensamble');
            res.json({ message: 'Detalle de ensamble agregado correctamente', id: nuevoId });
        });
    });
});

router.put('/detalleensamble/:id', (req, res) => {
    const id = req.params.id;
    const { idensamble, idcomponente } = req.body;
    const sql = 'UPDATE TDetalleEnsamble SET idensamble = ?, idcomponente = ? WHERE iddetalle = ?';
    conexion.query(sql, [idensamble, idcomponente, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar detalle de ensamble');
        res.json({ message: 'Detalle de ensamble actualizado correctamente' });
    });
});

router.delete('/detalleensamble/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TDetalleEnsamble SET estadologico = 0 WHERE iddetalle = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar detalle de ensamble');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalle de ensamble no encontrado' });
        res.json({ message: 'Detalle de ensamble eliminado (borrado lógico)' });
    });
});

module.exports = router;
