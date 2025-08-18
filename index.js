const express = require('express');
const app = express();
const puerto = 3000;

const getRolesRouter = require('./GET/GET_ROLES');
const getUsuariosRouter = require('./GET/GET_USUARIOS');
const getCategoriasRouter = require('./GET/GET_CATEGORIAS');
const getProductosRouter = require('./GET/GET_COMPONENTES');
const getComputadorasRouter = require('./GET/GET_COMPUTADORAS');
const getEnsamblesRouter = require('./GET/GET_ENSAMBLES');
const getDetalleEnsambleRouter = require('./GET/GET_DETALLE_ENSAMBLE');
const getMantenimientosRouter = require('./GET/GET_MANTENIMIENTOS');
const getDetalleMantenimientoRouter = require('./GET/GET_DETALLE_MANTENIMIENTO');
const getReservasRouter = require('./GET/GET_RESERVAS');
const getDetalleReservaRouter = require('./GET/GET_DETALLE_RESERVA')

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

app.listen(puerto, () => {
    console.log('Servidor levantado en puerto ' + puerto);
});
