const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/detalle_reserva', (req, res) => {
    const sql = 'SELECT * FROM TDetalleReserva';
    conexion.query(sql, (err, result) => {
        if (err) return res.status(500).send('Error en la consulta de TDetalleReserva');
        res.json(result);
    });
});

router.post('/detalle_reserva', (req, res) => {
    const { idreserva, idcomponente } = req.body;
    const data = { idreserva, idcomponente };
    const sqlInsert = 'INSERT INTO TDetalleReserva SET ?';
    conexion.query(sqlInsert, data, (err, result) => {
        if (err) return res.status(500).send('Error al insertar detalle de reserva');
        res.json({ 
            message: 'Detalle de reserva agregado correctamente', 
            id: result.insertId 
        });
    });
});

router.put('/detalle_reserva/:id', (req, res) => {
    const id = req.params.id;
    const { idreserva, idcomponente } = req.body;
    const sql = 'UPDATE TDetalleReserva SET idreserva = ?, idcomponente = ? WHERE iddetalle = ?';
    conexion.query(sql, [idreserva, idcomponente, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar detalle de reserva');
        res.json({ message: 'Detalle de reserva actualizado correctamente' });
    });
});

router.delete('/detalle_reserva/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TDetalleReserva SET estado = 0 WHERE iddetalle = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar detalle de reserva');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalle de reserva no encontrado' });
        res.json({ message: 'Detalle de reserva eliminado (borrado lógico)' });
    });
});

module.exports = router;