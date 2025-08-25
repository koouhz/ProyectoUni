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
    const { nombre, estado } = req.body;
    const data = { nombre, estado_logico: 1, estado };
    const sqlInsert = 'INSERT INTO TRoles SET ?';
    conexion.query(sqlInsert, data, (err, result) => {
        if (err) return res.status(500).send('Error al insertar rol');
        res.json({ message: 'Rol agregado correctamente', id: result.insertId });
    });
});

router.put('/roles/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, estado } = req.body;
    const sql = 'UPDATE TRoles SET nombre = ?, estado = ? WHERE idrol = ?';
    conexion.query(sql, [nombre, estado, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar rol');
        res.json({ message: 'Rol actualizado correctamente' });
    });
});

router.delete('/roles/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TRoles SET estado_logico = 0 WHERE idrol = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar rol');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Rol no encontrado' });
        res.json({ message: 'Rol eliminado (borrado lógico)' });
    });
});

module.exports = router;
