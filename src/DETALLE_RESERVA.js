const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/detallereservas', (req, res) => {
    const sql = 'SELECT * FROM TDetalleReserva';
    conexion.query(sql, (err, result) => {
        if (err) return res.status(500).send('Error en la consulta de TDetalleReserva');
        res.json(result);
    });
});

router.post('/detallereservas', (req, res) => {
    const { idreserva, idcomponente } = req.body;
    const sqlSelect = 'SELECT IFNULL(MAX(iddetalle), 0) + 1 AS nuevoId FROM TDetalleReserva';
    conexion.query(sqlSelect, (err, result) => {
        if (err) return res.status(500).send('Error al generar nuevo id');
        const nuevoId = result[0].nuevoId;
        const data = { iddetalle: nuevoId, idreserva, idcomponente };
        const sqlInsert = 'INSERT INTO TDetalleReserva SET ?';
        conexion.query(sqlInsert, data, (err2) => {
            if (err2) return res.status(500).send('Error al insertar detalle de reserva');
            res.json({ message: 'Detalle de reserva agregado correctamente', id: nuevoId });
        });
    });
});

router.put('/detallereservas/:id', (req, res) => {
    const id = req.params.id;
    const { idreserva, idcomponente } = req.body;
    const sql = 'UPDATE TDetalleReserva SET idreserva = ?, idcomponente = ? WHERE iddetalle = ?';
    conexion.query(sql, [idreserva, idcomponente, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar detalle de reserva');
        res.json({ message: 'Detalle de reserva actualizado correctamente' });
    });
});

router.delete('/detallereservas/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TDetalleReserva SET estadologico = 0 WHERE iddetalle = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar detalle de reserva');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalle de reserva no encontrado' });
        res.json({ message: 'Detalle de reserva eliminado (borrado lógico)' });
    });
});

module.exports = router;
