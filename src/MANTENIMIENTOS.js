const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/mantenimientos', (req, res) => {
    const sql = 'SELECT * FROM TMantenimientos';
    conexion.query(sql, (err, result) => {
        if (err) return res.status(500).send('Error en la consulta de TMantenimientos');
        res.json(result);
    });
});

router.post('/mantenimientos', (req, res) => {
    const { idcomputadora, idusuario, fechaprogramada, fecharealizada, costototal, estado } = req.body;
    const sqlSelect = 'SELECT IFNULL(MAX(idmantenimiento), 0) + 1 AS nuevoId FROM TMantenimientos';
    conexion.query(sqlSelect, (err, result) => {
        if (err) return res.status(500).send('Error al generar nuevo id');
        const nuevoId = result[0].nuevoId;
        const data = { idmantenimiento: nuevoId, idcomputadora, idusuario, fechaprogramada, fecharealizada, costototal, estado };
        const sqlInsert = 'INSERT INTO TMantenimientos SET ?';
        conexion.query(sqlInsert, data, (err2) => {
            if (err2) return res.status(500).send('Error al insertar mantenimiento');
            res.json({ message: 'Mantenimiento agregado correctamente', id: nuevoId });
        });
    });
});

router.put('/mantenimientos/:id', (req, res) => {
    const id = req.params.id;
    const { idcomputadora, idusuario, fechaprogramada, fecharealizada, costototal, estado } = req.body;
    const sql = 'UPDATE TMantenimientos SET idcomputadora = ?, idusuario = ?, fechaprogramada = ?, fecharealizada = ?, costototal = ?, estado = ? WHERE idmantenimiento = ?';
    conexion.query(sql, [idcomputadora, idusuario, fechaprogramada, fecharealizada, costototal, estado, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar mantenimiento');
        res.json({ message: 'Mantenimiento actualizado correctamente' });
    });
});

router.delete('/mantenimientos/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TMantenimientos SET estadologico = 0 WHERE idmantenimiento = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar mantenimiento');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Mantenimiento no encontrado' });
        res.json({ message: 'Mantenimiento eliminado (borrado lógico)' });
    });
});

module.exports = router;
