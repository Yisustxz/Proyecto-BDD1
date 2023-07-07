const express = require("express");
const familiaProductosRouter = require("./api/familia_productos.routes");
const productosRouter = require("./api/productos.routes");
const actividadesRouter = require("./api/actividades.routes");
const facturasRouter = require("./api/facturas.routes");
const pagosRouter = require("./api/pagos.routes");
const router = express.Router();

router.use("/familia_productos", familiaProductosRouter);
router.use("/productos", productosRouter);
router.use("/actividades", actividadesRouter);
router.use("/facturas", facturasRouter);
router.use("/pagos", pagosRouter);
//router.use('/escuelas', escuelasRouter)
//router.use('/estudiantes', estudiantesRouter)

module.exports = router;
