const express = require('express');
const router = express.Router();
const conexion = require('./config/connection');

router.get('/ensambles', (req, res) => {
    const sql = 'SELECT * FROM TEnsambles';
    conexion.query(sql, (err, result) => {
        if (err) return res.status(500).send('Error en la consulta de TEnsambles');
        res.json(result);
    });
});

router.post('/ensambles', (req, res) => {
    const { idusuariotecnico, idusuariocliente, fechafin, costototal, estado } = req.body;
    const data = { idusuariotecnico, idusuariocliente, fechafin, costototal, estado };
    const sqlInsert = 'INSERT INTO TEnsambles SET ?';
    conexion.query(sqlInsert, data, (err, result) => {
        if (err) return res.status(500).send('Error al insertar ensamble');
        res.json({ 
            message: 'Ensamble agregado correctamente', 
            id: result.insertId 
        });
    });
});

router.put('/ensambles/:id', (req, res) => {
    const id = req.params.id;
    const { idusuariotecnico, idusuariocliente, fechafin, costototal, estado } = req.body;
    const sql = 'UPDATE TEnsambles SET idusuariotecnico = ?, idusuariocliente = ?, fechafin = ?, costototal = ?, estado = ? WHERE idensamble = ?';
    conexion.query(sql, [idusuariotecnico, idusuariocliente, fechafin, costototal, estado, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar ensamble');
        res.json({ message: 'Ensamble actualizado correctamente' });
    });
});

router.delete('/ensambles/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE TEnsambles SET estado = 0 WHERE idensamble = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error al eliminar ensamble');
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Ensamble no encontrado' });
        res.json({ message: 'Ensamble eliminado (borrado lógico)' });
    });
});

module.exports = router;