const express = require('express');
const app = express();
app.use(express.json());
const puerto = 3000;

const getRolesRouter = require('./src/ROLES');
const getUsuariosRouter = require('./src/USUARIOS');
const getCategoriasRouter = require('./src/CATEGORIAS');
const getProductosRouter = require('./src/COMPONENTES');
const getComputadorasRouter = require('./src/COMPUTADORAS');
const getEnsamblesRouter = require('./src/ENSAMBLES');
const getDetalleEnsambleRouter = require('./src/DETALLE_ENSAMBLE');
const getMantenimientosRouter = require('./src/MANTENIMIENTOS');
const getDetalleMantenimientoRouter = require('./src/DETALLE_MANTENIMIENTO');
const getReservasRouter = require('./src/RESERVAS');
const getDetalleReservaRouter = require('./src/DETALLE_RESERVA')

app.use('/Proyecto', getRolesRouter);
app.use('/Proyecto', getUsuariosRouter);
app.use('/Proyecto', getCategoriasRouter);
app.use('/Proyecto', getProductosRouter);
app.use('/Proyecto', getComputadorasRouter);
app.use('/Proyecto', getEnsamblesRouter);
app.use('/Proyecto', getDetalleEnsambleRouter);
app.use('/Proyecto', getMantenimientosRouter);
app.use('/Proyecto', getDetalleMantenimientoRouter);
app.use('/Proyecto', getReservasRouter);
app.use('/Proyecto', getDetalleReservaRouter);

app.listen(puerto, '0.0.0.0', () => {
    console.log('Servidor levantado en puerto ' + puerto);
});
