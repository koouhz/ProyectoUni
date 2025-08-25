const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/Categorias', (req, res) => {
    const sql = 'SELECT * FROM TCategorias WHERE EstadoLogico = 1';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error("Error en SELECT categorias:", err);
            return res.status(500).send("Error en el servidor");
        }
        res.json(result);
    });
});

router.post('/Categorias', (req, res) => {
    const { nombre } = req.body;

    const data = {
        Nombre: nombre,
        Estado: 1,
        EstadoLogico: 1,
        FechaRegistro: new Date()
    };

    const sqlInsert = 'INSERT INTO TCategorias SET ?';
    conexion.query(sqlInsert, data, (err, result) => {
        if (err) {
            console.error("Error al insertar categoría:", err);
            return res.status(500).send("Error en el servidor");
        }

        res.json({ 
            message: "Categoría agregada correctamente",
            id: result.insertId 
        });
    });
});

router.put('/Categorias/:id', (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;

    const sql = 'UPDATE TCategorias SET Nombre = ? WHERE IdCategoria = ? AND EstadoLogico = 1';
    conexion.query(sql, [nombre, id], (err, result) => {
        if (err) {
            console.error("Error en UPDATE categoria:", err);
            return res.status(500).send("Error en el servidor");
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Categoría no encontrada o eliminada" });
        }
        res.json({ message: "Categoría actualizada correctamente" });
    });
});

router.delete('/Categorias/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TCategorias SET EstadoLogico = 0 WHERE IdCategoria = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error en DELETE logico categoria:", err);
            return res.status(500).send("Error en el servidor");
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.json({ message: "Categoría eliminada (borrado lógico)" });
    });
});

module.exports = router;
