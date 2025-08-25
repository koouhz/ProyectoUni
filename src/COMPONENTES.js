const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/Componentes', (req, res) => {
    const sql = "SELECT * FROM TComponentes WHERE Estado = 1";
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
        IdCategoria: idcategoria,
        Nombre: nombre,
        StockDisponible: stockdisponible || 0,
        CostoUnitario: costounitario || 0.00,
        StockDañado: stockdanado || 0,
        StockEnUso: stockenuso || 0,
        StockUsado: stockusado || 0,
        Estado: 1,
        EstadoLogico: 1,
        FechaRegistro: new Date()
    };

    const sqlInsert = 'INSERT INTO TComponentes SET ?';
    conexion.query(sqlInsert, data, (err, result) => {
        if (err) {
            console.error("Error al insertar componente:", err);
            return res.status(500).send("Error en el servidor");
        }
        res.json({ 
            message: "Componente agregado correctamente",
            id: result.insertId 
        });
    });
});


router.put('/Componentes/:id', (req, res) => {
    const id = req.params.id;
    const { idcategoria, nombre, stockdisponible, costounitario, stockdanado, stockenuso, stockusado } = req.body;

    const sql = `
        UPDATE TComponentes
        SET IdCategoria = ?, Nombre = ?, StockDisponible = ?, CostoUnitario = ?,
            StockDañado = ?, StockEnUso = ?, StockUsado = ?
        WHERE IdComponente = ?
    `;
    conexion.query(sql, [idcategoria, nombre, stockdisponible, costounitario, stockdanado, stockenuso, stockusado, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar componente:", err);
            return res.status(500).send("Error en el servidor");
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Componente no encontrado" });
        }
        res.json({ message: "Componente actualizado correctamente" });
    });
});

router.delete('/Componentes/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE TComponentes SET Estado = 'C', EstadoLogico = 0 WHERE IdComponente = ?";
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
