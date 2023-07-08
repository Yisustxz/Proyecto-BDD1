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
router.use("/descuentos", descuentosRouter);
router.use("/servicios", serviciosRouter);
router.use("/productos", productosRouter);
router.use("/actividades", actividadesRouter);
router.use("/facturas", facturasRouter);
router.use("/pagos", pagosRouter);
router.use("/seEspecializa", seEspecializaRouter);
router.use("/seLeRecomiendan", seLeRecomiendanRouter);
router.use("/especifica", especificaRouter);

//router.use('/escuelas', escuelasRouter)
//router.use('/estudiantes', estudiantesRouter)

module.exports = router;
