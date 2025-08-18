const express = require('express');
const router = express.Router();
const { obtenerUsuarios } = require('../controllers/mostrar_datos');

router.get('/', (req, res) => {
  obtenerUsuarios((err, usuarios) => {
    if (err) {
      return res.status(500).send('Error al cargar los datos');
    }
    res.render('index', { usuarios });
  });
});

module.exports = router;