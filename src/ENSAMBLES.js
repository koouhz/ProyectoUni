const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/ensambles', (req, res) => {
    const sql = 'SELECT * FROM TDetalleEnsamble';
    conexion.query(sql, (err, result) => {
        if (err) return res.status(500).send('Error en la consulta de TDetalleEnsamble');
        res.json(result);
    });
});

router.post('/ensambles', (req, res) => {
    const { IdEnsamble, IdComponente } = req.body; // solo los campos que existen
    const data = {
        IdEnsamble,
        IdComponente,
        Estado: 1,
        EstadoLogico: 1
    };
    const sqlInsert = 'INSERT INTO TDetalleEnsamble SET ?';
    conexion.query(sqlInsert, data, (err, result) => {
        if (err) {
            console.error("Error al insertar detalle de ensamble:", err);
            return res.status(500).send("Error al insertar detalle de ensamble");
        }
        res.json({ 
            message: "Detalle de ensamble agregado correctamente",
            id: result.insertId 
        });
    });
});


router.put('/ensambles/:id', (req, res) => {
    const id = req.params.id;
    const { IdEnsamble, IdComponente, Cantidad, Subtotal, Estado } = req.body;
    const sql = `
        UPDATE TDetalleEnsamble 
        SET IdEnsamble = ?, IdComponente = ?, Cantidad = ?, Subtotal = ?, Estado = ?
        WHERE IdDetalle = ?
    `;
    conexion.query(sql, [IdEnsamble, IdComponente, Cantidad, Subtotal, Estado, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar detalle de ensamble');
        res.json({ message: 'Detalle de ensamble actualizado correctamente' });
    });
});

router.delete('/ensambles/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TDetalleEnsamble SET EstadoLogico = 0 WHERE IdDetalle = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar detalle de ensamble');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalle de ensamble no encontrado' });
        res.json({ message: 'Detalle de ensamble eliminado (borrado lógico)' });
    });
});

module.exports = router;
