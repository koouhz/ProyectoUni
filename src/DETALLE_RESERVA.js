const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/detallereserva', (req, res) => {
    const sql = 'SELECT * FROM TDetalleReserva WHERE EstadoLogico = 1';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error("Error al consultar TDetalleReserva:", err);
            return res.status(500).send("Error en la consulta de TDetalleReserva");
        }
        res.json(result);
    });
});

router.post('/detallereserva', (req, res) => {
    const { IdReserva, IdComponente, Estado } = req.body;
    const data = { IdReserva, IdComponente, Estado: Estado || 1, EstadoLogico: 1 };
    const sqlInsert = 'INSERT INTO TDetalleReserva SET ?';
    conexion.query(sqlInsert, data, (err, result) => {
        if (err) {
            console.error("Error al insertar detalle de reserva:", err);
            return res.status(500).send("Error al insertar detalle de reserva");
        }
        res.json({ 
            message: "Detalle de reserva agregado correctamente", 
            id: result.insertId 
        });
    });
});

router.put('/detallereserva/:id', (req, res) => {
    const id = req.params.id;
    const { IdReserva, IdComponente, Estado } = req.body;
    const sql = `
        UPDATE TDetalleReserva
        SET IdReserva = ?, IdComponente = ?, Estado = ?
        WHERE IdDetalle = ?
    `;
    conexion.query(sql, [IdReserva, IdComponente, Estado, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar detalle de reserva:", err);
            return res.status(500).send("Error al actualizar detalle de reserva");
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Detalle de reserva no encontrado" });
        }
        res.json({ message: "Detalle de reserva actualizado correctamente" });
    });
});

router.delete('/detallereserva/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TDetalleReserva SET EstadoLogico = 0 WHERE IdDetalle = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar detalle de reserva:", err);
            return res.status(500).send("Error al eliminar detalle de reserva");
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Detalle de reserva no encontrado" });
        }
        res.json({ message: "Detalle de reserva eliminado (borrado lógico)" });
    });
});

module.exports = router;
