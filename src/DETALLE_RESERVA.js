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
    const { idusuario, fecha, descripcion, estado } = req.body;
    const data = { idusuario, fecha, descripcion, estado };
    const sqlInsert = 'INSERT INTO TReservas SET ?';
    conexion.query(sqlInsert, data, (err, result) => {
        if (err) return res.status(500).send('Error al insertar reserva');
        res.json({ 
            message: 'Reserva agregada correctamente', 
            id: result.insertId 
        });
    });
});

router.put('/reservas/:id', (req, res) => {
    const id = req.params.id;
    const { idusuario, fecha, descripcion, estado } = req.body;
    const sql = `
        UPDATE TReservas 
        SET idusuario = ?, fecha = ?, descripcion = ?, estado = ?
        WHERE idreserva = ?
    `;
    conexion.query(sql, [idusuario, fecha, descripcion, estado, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar reserva');
        res.json({ message: 'Reserva actualizada correctamente' });
    });
});

router.delete('/reservas/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TReservas SET estado = 0 WHERE idreserva = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar reserva');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Reserva no encontrada' });
        res.json({ message: 'Reserva eliminada (borrado lógico)' });
    });
});

module.exports = router;
