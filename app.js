const express = require('express');
const app = express();
app.use(express.json());
const puerto = 3000;

const getRolesRouter = require('./src/roles');
const getUsuariosRouter = require('./src/usuarios');
const getCategoriasRouter = require('./src/categorias');
const getProductosRouter = require('./src/componentes');
const getComputadorasRouter = require('./src/computadoras');
const getEnsamblesRouter = require('./src/ensambles');
const getDetalleEnsambleRouter = require('./src/detalle_ensamble');
const getMantenimientosRouter = require('./src/mantenimientos');
const getDetalleMantenimientoRouter = require('./src/detalle_mantenimiento');
const getReservasRouter = require('./src/reservas');
const getDetalleReservaRouter = require('./src/detalle_reserva')

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
