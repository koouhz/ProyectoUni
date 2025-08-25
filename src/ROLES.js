const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/roles', (req, res) => {
    const sql = 'SELECT * FROM TRoles';
    conexion.query(sql, (err, result) => {
        if (err) return res.status(500).send('Error en la consulta de TRoles');
        res.json(result);
    });
});

router.post('/roles', (req, res) => {
    const { Nombre, Estado } = req.body;

    if (!Nombre || Estado === undefined) {
        return res.status(400).send('Faltan campos obligatorios: Nombre o Estado');
    }

    const data = { Nombre, Estado, EstadoLogico: 1 };
    const sqlInsert = 'INSERT INTO TRoles SET ?';

    conexion.query(sqlInsert, data, (err, result) => {
        if (err) {
            console.error("Error al insertar rol:", err);
            return res.status(500).send('Error al insertar rol');
        }
        res.json({ message: 'Rol agregado correctamente', id: result.insertId });
    });
});


router.put('/roles/:id', (req, res) => {
    const id = req.params.id;
    const { Nombre, Estado } = req.body;
    const sql = 'UPDATE TRoles SET Nombre = ?, Estado = ? WHERE IdRol = ?';
    conexion.query(sql, [Nombre, Estado, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar rol');
        res.json({ message: 'Rol actualizado correctamente' });
    });
});

router.delete('/roles/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TRoles SET EstadoLogico = 0 WHERE IdRol = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar rol');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Rol no encontrado' });
        res.json({ message: 'Rol eliminado (borrado lógico)' });
    });
});

module.exports = router;
