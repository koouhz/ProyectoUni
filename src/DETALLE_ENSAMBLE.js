const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/DetalleEnsamble', (req, res) => {
    const sql = 'SELECT * FROM TDetalleEnsamble WHERE estado = 1';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error("Error al consultar TDetalleEnsamble:", err);
            return res.status(500).send("Error en la consulta de TDetalleEnsamble");
        }
        res.json(result);
    });
});

router.post('/DetalleEnsamble', (req, res) => {
    const { idensamble, idcomponente } = req.body;
    const data = {
        idensamble,
        idcomponente,
        estado: 1,
        fecharegistro: new Date()
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

router.put('/DetalleEnsamble/:id', (req, res) => {
    const id = req.params.id;
    const { idensamble, idcomponente } = req.body;
    const sql = 'UPDATE TDetalleEnsamble SET idensamble = ?, idcomponente = ? WHERE iddetalle = ?';
    conexion.query(sql, [idensamble, idcomponente, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar detalle de ensamble:", err);
            return res.status(500).send("Error al actualizar detalle de ensamble");
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Detalle de ensamble no encontrado" });
        }
        res.json({ message: "Detalle de ensamble actualizado correctamente" });
    });
});

router.delete('/DetalleEnsamble/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TDetalleEnsamble SET estado = 0 WHERE iddetalle = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar detalle de ensamble:", err);
            return res.status(500).send("Error al eliminar detalle de ensamble");
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Detalle de ensamble no encontrado" });
        }
        res.json({ message: "Detalle de ensamble eliminado (borrado lógico)" });
    });
});

module.exports = router;
