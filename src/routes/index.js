const express = require("express");
const familiaProductosRouter = require("./api/familia_productos.routes");
const modelosRouter = require("./api/modelos.routes");
const vehiculosRouter = require("./api/vehiculos.routes");
const clientesRouter = require("./api/clientes.routes");
const trabajadoresRouter = require("./api/trabajadores.routes");
const encargadosRouter = require("./api/encargados.routes");
const ordenesServicioRouter = require("./api/ordenes_servicio.routes");
const detalleServicioRouter = require("./api/detalle_servicio.routes");
const ciudadesRouter = require("./api/ciudades.routes");
const estadosRouter = require("./api/estados.routes");
const concesionarioRouter = require("./api/concesionario.routes");
const descuentosRouter = require("./api/descuentos.routes");
const serviciosRouter = require("./api/servicios.routes");
const productosRouter = require("./api/productos.routes");
const actividadesRouter = require("./api/actividades.routes");
const facturasRouter = require("./api/facturas.routes");
const pagosRouter = require("./api/pagos.routes");
const seEspecializaRouter = require("./api/se_especializa.routes");
const seLeRecomiendanRouter = require("./api/se_le_recomiendan.routes");
const especificaRouter = require("./api/especifica.routes");
const reservaRouter = require("./api/reservas.routes");
const seLeHacenRouter = require("./api/se_le_hacen.routes");
const utilizaRouter = require("./api/utiliza.routes");
const poseeRouter = require("./api/posee.routes");
const router = express.Router();

router.use("/FamiliaProductos", familiaProductosRouter);
router.use("/modelos", modelosRouter);
router.use("/vehiculos", vehiculosRouter);
router.use("/clientes", clientesRouter);
router.use("/Trabajador", trabajadoresRouter);
router.use("/Encargado", encargadosRouter);
router.use("/OrdenesServicio", ordenesServicioRouter);
router.use("/DetallesServicio", detalleServicioRouter);
router.use("/Ciudades", ciudadesRouter);
router.use("/Estados", estadosRouter);
router.use("/Concesionarios", concesionarioRouter);
router.use("/Descuentos", descuentosRouter);
router.use("/Servicios", serviciosRouter);
router.use("/Productos", productosRouter);
router.use("/Actividades", actividadesRouter);
router.use("/Facturas", facturasRouter);
router.use("/Pagos", pagosRouter);
router.use("/Especializaciones", seEspecializaRouter);
router.use("/MantenimientosRecomendados", seLeRecomiendanRouter);
router.use("/EspecificacionesActividades", especificaRouter);
router.use("/reservas", reservaRouter);
router.use("/seLeHacen", seLeHacenRouter);
router.use("/utiliza", utilizaRouter);
router.use("/posee", poseeRouter);

//router.use('/escuelas', escuelasRouter)
//router.use('/estudiantes', estudiantesRouter)

module.exports = router;
