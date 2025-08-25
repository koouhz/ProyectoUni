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
    const { IdComputadora, IdUsuario, FechaProgramada, FechaRealizada, CostoTotal, Estado } = req.body;
    const data = { IdComputadora, IdUsuario, FechaProgramada, FechaRealizada, CostoTotal, Estado, EstadoLogico: 1 };
    const sqlInsert = 'INSERT INTO TMantenimientos SET ?';
    conexion.query(sqlInsert, data, (err, result) => {
        if (err) return res.status(500).send('Error al insertar mantenimiento');
        res.json({ message: 'Mantenimiento agregado correctamente', id: result.insertId });
    });
});

router.put('/mantenimientos/:id', (req, res) => {
    const id = req.params.id;
    const { IdComputadora, IdUsuario, FechaProgramada, FechaRealizada, CostoTotal, Estado } = req.body;
    const sql = 'UPDATE TMantenimientos SET IdComputadora = ?, IdUsuario = ?, FechaProgramada = ?, FechaRealizada = ?, CostoTotal = ?, Estado = ? WHERE IdMantenimiento = ?';
    conexion.query(sql, [IdComputadora, IdUsuario, FechaProgramada, FechaRealizada, CostoTotal, Estado, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar mantenimiento');
        res.json({ message: 'Mantenimiento actualizado correctamente' });
    });
});

router.delete('/mantenimientos/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TMantenimientos SET EstadoLogico = 0 WHERE IdMantenimiento = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar mantenimiento');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Mantenimiento no encontrado' });
        res.json({ message: 'Mantenimiento eliminado (borrado lógico)' });
    });
});

module.exports = router;
