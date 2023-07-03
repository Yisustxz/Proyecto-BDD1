const express = require("express");
const familiaProductosRouter = require("./api/familia_productos.routes");
const descuentosRouter = require("./api/descuentos.routes");
const serviciosRouter = require("./api/servicios.routes");
const router = express.Router();

router.use("/familia_productos", familiaProductosRouter);
router.use("/descuentos", descuentosRouter);
router.use("/servicios", serviciosRouter);
//router.use('/escuelas', escuelasRouter)
//router.use('/estudiantes', estudiantesRouter)

module.exports = router;
