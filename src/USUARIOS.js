const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM TUsuarios';
    conexion.query(sql, (err, result) => {
        if (err) return res.status(500).send('Error en la consulta de TUsuarios');
        res.json(result);
    });
});

router.post('/usuarios', (req, res) => {
    const { idrol, nombre, apellido1, correo, contrasena, estadologico } = req.body;
    const sqlSelect = 'SELECT IFNULL(MAX(idusuario), 0) + 1 AS nuevoId FROM TUsuarios';
    conexion.query(sqlSelect, (err, result) => {
        if (err) return res.status(500).send('Error al generar nuevo id');
        const nuevoId = result[0].nuevoId;
        const data = { idusuario: nuevoId, idrol, nombre, apellido1, correo, contrasena, estadologico };
        const sqlInsert = 'INSERT INTO TUsuarios SET ?';
        conexion.query(sqlInsert, data, (err2) => {
            if (err2) return res.status(500).send('Error al insertar usuario');
            res.json({ message: 'Usuario agregado correctamente', id: nuevoId });
        });
    });
});

router.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const { idrol, nombre, apellido1, correo, contrasena, estadologico } = req.body;
    const sql = 'UPDATE TUsuarios SET idrol = ?, nombre = ?, apellido1 = ?, correo = ?, contrasena = ?, estadologico = ? WHERE idusuario = ?';
    conexion.query(sql, [idrol, nombre, apellido1, correo, contrasena, estadologico, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar usuario');
        res.json({ message: 'Usuario actualizado correctamente' });
    });
});

router.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TUsuarios SET estadologico = 0 WHERE idusuario = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar usuario');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado (borrado lógico)' });
    });
});

module.exports = router;
