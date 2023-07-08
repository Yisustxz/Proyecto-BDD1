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
const router = express.Router();

router.use("/familia_productos", familiaProductosRouter);
router.use("/modelos", modelosRouter);
router.use("/vehiculos", vehiculosRouter);
router.use("/clientes", clientesRouter);
router.use("/trabajadores", trabajadoresRouter);
router.use("/encargados", encargadosRouter);
router.use("/ordenesServicios", ordenesServicioRouter);
router.use("/detalleServicio", detalleServicioRouter);
router.use("/ciudades", ciudadesRouter);
router.use("/estados", estadosRouter);
router.use("/concesionario", concesionarioRouter);

//router.use('/escuelas', escuelasRouter)
//router.use('/estudiantes', estudiantesRouter)

module.exports = router;
