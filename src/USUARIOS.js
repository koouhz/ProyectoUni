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
    const { idrol, nombre, apellido1, correo, contrasena, estado } = req.body;
    const data = { idrol, nombre, apellido1, correo, contrasena, estado };
    const sqlInsert = 'INSERT INTO TUsuarios SET ?';
    conexion.query(sqlInsert, data, (err, result) => {
        if (err) return res.status(500).send('Error al insertar usuario');
        res.json({ 
            message: 'Usuario agregado correctamente', 
            id: result.insertId 
        });
    });
});

router.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const { idrol, nombre, apellido1, correo, contrasena, estado } = req.body;
    const sql = 'UPDATE TUsuarios SET idrol = ?, nombre = ?, apellido1 = ?, correo = ?, contrasena = ?, estado = ? WHERE idusuario = ?';
    conexion.query(sql, [idrol, nombre, apellido1, correo, contrasena, estado, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar usuario');
        res.json({ message: 'Usuario actualizado correctamente' });
    });
});

router.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TUsuarios SET estado = 0 WHERE idusuario = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar usuario');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado (borrado lógico)' });
    });
});

module.exports = router;