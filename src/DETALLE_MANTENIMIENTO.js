const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/detallemantenimientos', (req, res) => {
    const sql = 'SELECT * FROM TDetalleMantenimiento WHERE EstadoLogico = 1';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error("Error al consultar TDetalleMantenimiento:", err);
            return res.status(500).send("Error en la consulta de TDetalleMantenimiento");
        }
        res.json(result);
    });
});

router.post('/detallemantenimientos', (req, res) => {
    const { IdMantenimiento, IdComponente, Estado } = req.body;

    const data = {
        IdMantenimiento,
        IdComponente,
        Estado: Estado || 1,
        EstadoLogico: 1
    };

    const sqlInsert = 'INSERT INTO TDetalleMantenimiento SET ?';
    conexion.query(sqlInsert, data, (err, result) => {
        if (err) {
            console.error("Error al insertar detalle de mantenimiento:", err);
            return res.status(500).send("Error al insertar detalle de mantenimiento");
        }
        res.json({ 
            message: "Detalle de mantenimiento agregado correctamente", 
            id: result.insertId 
        });
    });
});


router.put('/detallemantenimientos/:id', (req, res) => {
    const id = req.params.id;
    const { IdMantenimiento, IdComponente, Estado } = req.body;
    const sql = `
        UPDATE TDetalleMantenimiento
        SET IdMantenimiento = ?, IdComponente = ?, Estado = ?
        WHERE IdDetalle = ?
    `;
    conexion.query(sql, [IdMantenimiento, IdComponente, Estado, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar detalle de mantenimiento:", err);
            return res.status(500).send("Error al actualizar detalle de mantenimiento");
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Detalle de mantenimiento no encontrado" });
        }
        res.json({ message: "Detalle de mantenimiento actualizado correctamente" });
    });
});

router.delete('/detallemantenimientos/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TDetalleMantenimiento SET EstadoLogico = 0 WHERE IdDetalle = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar detalle de mantenimiento:", err);
            return res.status(500).send("Error al eliminar detalle de mantenimiento");
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Detalle de mantenimiento no encontrado" });
        }
        res.json({ message: "Detalle de mantenimiento eliminado (borrado lógico)" });
    });
});

module.exports = router;
