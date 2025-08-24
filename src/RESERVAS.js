const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/reservas', (req, res) => {
    const sql = 'SELECT * FROM TReservas';
    conexion.query(sql, (err, result) => {
        if (err) return res.status(500).send('Error en la consulta de TReservas');
        res.json(result);
    });
});

router.post('/reservas', (req, res) => {
    const { idusuario, fechareserva, pago, estado } = req.body;
    const sqlSelect = 'SELECT IFNULL(MAX(idreserva), 0) + 1 AS nuevoId FROM TReservas';
    conexion.query(sqlSelect, (err, result) => {
        if (err) return res.status(500).send('Error al generar nuevo id');
        const nuevoId = result[0].nuevoId;
        const data = { idreserva: nuevoId, idusuario, fechareserva, pago, estado };
        const sqlInsert = 'INSERT INTO TReservas SET ?';
        conexion.query(sqlInsert, data, (err2) => {
            if (err2) return res.status(500).send('Error al insertar reserva');
            res.json({ message: 'Reserva agregada correctamente', id: nuevoId });
        });
    });
});

router.put('/reservas/:id', (req, res) => {
    const id = req.params.id;
    const { idusuario, fechareserva, pago, estado } = req.body;
    const sql = 'UPDATE TReservas SET idusuario = ?, fechareserva = ?, pago = ?, estado = ? WHERE idreserva = ?';
    conexion.query(sql, [idusuario, fechareserva, pago, estado, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar reserva');
        res.json({ message: 'Reserva actualizada correctamente' });
    });
});

router.delete('/reservas/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TReservas SET estadologico = 0 WHERE idreserva = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar reserva');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Reserva no encontrada' });
        res.json({ message: 'Reserva eliminada (borrado lógico)' });
    });
});

module.exports = router;
