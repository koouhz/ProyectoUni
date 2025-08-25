const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/Componentes', (req, res) => {
    const sql = "SELECT * FROM TComponentes WHERE estado = 'A'";
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error("Error al consultar TComponentes:", err);
            return res.status(500).send("Error en la consulta de TComponentes");
        }
        res.json(result);
    });
});

router.post('/Componentes', (req, res) => {
    const { idcategoria, nombre, stockdisponible, costounitario, stockdanado, stockenuso, stockusado } = req.body;

    const data = {
        idcategoria,
        nombre,
        stockdisponible: stockdisponible || 0,
        costounitario: costounitario || 0.00,
        stockdanado: stockdanado || 0,
        stockenuso: stockenuso || 0,
        stockusado: stockusado || 0,
        estado: 'A',
        fecharegistro: new Date()
    };

    const sqlInsert = 'INSERT INTO TComponentes SET ?';
    conexion.query(sqlInsert, data, (err, result) => {
        if (err) {
            console.error("Error al insertar componente:", err);
            return res.status(500).send("Error en el servidor");
        }

        const nuevoId = result.insertId;

        res.json({ 
            message: "Componente agregado correctamente",
            id: nuevoId 
        });
    });
});

router.put('/Componentes/:id', (req, res) => {
    const id = req.params.id;
    const { idcategoria, nombre, stockdisponible, costounitario, stockdanado, stockenuso, stockusado } = req.body;

    const sql = `
        UPDATE TComponentes 
        SET idcategoria = ?, nombre = ?, stockdisponible = ?, costounitario = ?, 
            stockdanado = ?, stockenuso = ?, stockusado = ? 
        WHERE idcomponente = ?
    `;
    conexion.query(sql, [idcategoria, nombre, stockdisponible, costounitario, stockdanado, stockenuso, stockusado, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar componente:", err);
            return res.status(500).send("Error en el servidor");
        }
        res.json({ message: "Componente actualizado correctamente" });
    });
});

router.delete('/Componentes/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE TComponentes SET estado = 'C' WHERE idcomponente = ?";
    conexion.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar componente:", err);
            return res.status(500).send("Error en el servidor");
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Componente no encontrado" });
        }
        res.json({ message: "Componente eliminado (borrado lógico)" });
    });
});

module.exports = router;
