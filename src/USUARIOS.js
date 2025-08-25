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
    const { IdRol, Nombre, Apellido1, Correo, Contraseña, Estado } = req.body;

    const data = {
        IdRol,
        Nombre,
        Apellido1,
        Correo,
        Contraseña,
        Estado,
        EstadoLogico: 1
    };

    const sqlInsert = 'INSERT INTO TUsuarios SET ?';
    conexion.query(sqlInsert, data, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al insertar usuario');
        }
        res.json({ message: 'Usuario agregado correctamente', id: result.insertId });
    });
});

router.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const { IdRol, Nombre, Apellido1, Correo, Contraseña, Estado } = req.body;

    const sql = `
        UPDATE TUsuarios 
        SET IdRol = ?, Nombre = ?, Apellido1 = ?, Correo = ?, Contraseña = ?, Estado = ? 
        WHERE IdUsuario = ?
    `;
    conexion.query(sql, [IdRol, Nombre, Apellido1, Correo, Contraseña, Estado, id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al actualizar usuario');
        }
        res.json({ message: 'Usuario actualizado correctamente' });
    });
});

router.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TUsuarios SET EstadoLogico = 0 WHERE IdUsuario = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar usuario');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado (borrado lógico)' });
    });
});

module.exports = router;
