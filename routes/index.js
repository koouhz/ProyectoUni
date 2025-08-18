const express = require('express');
const router = express.Router();
const { obtenerUsuarios } = require('../controllers/mostrar_datos');

// Route for the homepage
router.get('/', async (req, res) => {
  try {
    // Fetch users using obtenerUsuarios (assumed to return a Promise for modernization)
    const usuarios = await new Promise((resolve, reject) => {
      obtenerUsuarios((err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    // Render the index view with title and usuarios
    res.render('index', {
      title: 'Inicio - Proyecto',
      usuarios: usuarios || [], // Fallback to empty array to prevent undefined errors
      layout: 'index' // Explicitly specify layout if using express-ejs-layouts
    });
  } catch (error) {
    console.error('Error in homepage route:', error);
    res.status(500).send('Error al cargar los datos');
  }
});

module.exports = router;