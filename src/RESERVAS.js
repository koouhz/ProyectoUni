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
    const { IdUsuario, FechaReserva, Pago, Estado } = req.body;

    if (!IdUsuario || !FechaReserva || Pago === undefined || !Estado) {
        return res.status(400).send('Faltan campos obligatorios');
    }

    const data = {
        IdUsuario: IdUsuario,
        FechaReserva: FechaReserva,
        Pago: Pago,
        Estado: Estado,
        EstadoLogico: 1
    };

    const sqlInsert = 'INSERT INTO TReservas SET ?';
    conexion.query(sqlInsert, data, (err, result) => {
        if (err) {
            console.error("Error al insertar reserva:", err);
            return res.status(500).send('Error al insertar reserva');
        }
        res.json({ message: 'Reserva agregada correctamente', id: result.insertId });
    });
});


router.put('/reservas/:id', (req, res) => {
    const id = req.params.id;
    const { IdUsuario, FechaReserva, Pago, Estado } = req.body;
    const sql = 'UPDATE TReservas SET IdUsuario = ?, FechaReserva = ?, Pago = ?, Estado = ? WHERE IdReserva = ?';
    conexion.query(sql, [IdUsuario, FechaReserva, Pago, Estado, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar reserva');
        res.json({ message: 'Reserva actualizada correctamente' });
    });
});

router.delete('/reservas/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TReservas SET EstadoLogico = 0 WHERE IdReserva = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar reserva');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Reserva no encontrada' });
        res.json({ message: 'Reserva eliminada (borrado lógico)' });
    });
});

module.exports = router;
