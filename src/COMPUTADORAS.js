const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/Computadoras', (req, res) => {
    const sql = 'SELECT * FROM TComputadoras WHERE estado = 1';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error("Error al consultar TComputadoras:", err);
            return res.status(500).send("Error en la consulta de TComputadoras");
        }
        res.json(result);
    });
});

router.post('/Computadoras', (req, res) => {
    const { idusuario, nombre } = req.body;
    const data = {
        idusuario,
        nombre,
        estado: 1,
        fecharegistro: new Date()
    };
    const sqlInsert = 'INSERT INTO TComputadoras SET ?';
    conexion.query(sqlInsert, data, (err, result) => {
        if (err) {
            console.error("Error al insertar computadora:", err);
            return res.status(500).send("Error al insertar computadora");
        }
        res.json({ 
            message: "Computadora agregada correctamente", 
            id: result.insertId 
        });
    });
});

router.put('/Computadoras/:id', (req, res) => {
    const id = req.params.id;
    const { idusuario, nombre } = req.body;
    const sql = 'UPDATE TComputadoras SET idusuario = ?, nombre = ? WHERE idcomputadora = ?';
    conexion.query(sql, [idusuario, nombre, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar computadora:", err);
            return res.status(500).send("Error al actualizar computadora");
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Computadora no encontrada" });
        }
        res.json({ message: "Computadora actualizada correctamente" });
    });
});

router.delete('/Computadoras/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TComputadoras SET estado = 0 WHERE idcomputadora = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar computadora:", err);
            return res.status(500).send("Error al eliminar computadora");
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Computadora no encontrada" });
        }
        res.json({ message: "Computadora eliminada (borrado lógico)" });
    });
});

module.exports = router;
