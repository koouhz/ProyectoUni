const express = require('express');
const app = express();
const puerto = 3000;

const getRolesRouter = require('./procedures/roles/GET_ROLES');
const getUsuariosRouter = require('./procedures/usuarios/GET_USUARIOS');
const getCategoriasRouter = require('./procedures/categorias/GET_CATEGORIAS');
const getProductosRouter = require('./procedures/componentes/GET_COMPONENTES');
const getComputadorasRouter = require('./procedures/computadoras/GET_COMPUTADORAS');
const getEnsamblesRouter = require('./procedures/ensambles/GET_ENSAMBLES');
const getDetalleEnsambleRouter = require('./procedures/detalle_ensamble/GET_DETALLE_ENSAMBLE');
const getMantenimientosRouter = require('./procedures/mantenimientos/GET_MANTENIMIENTOS');
const getDetalleMantenimientoRouter = require('./procedures/detalle_mantenimiento/GET_DETALLE_MANTENIMIENTO');
const getReservasRouter = require('./procedures/reservas/GET_RESERVAS');
const getDetalleReservaRouter = require('./procedures/detalle_reserva/GET_DETALLE_RESERVA')

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
