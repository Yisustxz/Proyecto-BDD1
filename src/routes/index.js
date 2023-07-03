const express = require("express");
const familiaProductosRouter = require("./api/familia_productos.routes");
const ciudadesRouter = require("./api/ciudades.routes");
const estadosRouter = require("./api/estados.routes");
const router = express.Router();

router.use("/familia_productos", familiaProductosRouter);
router.use("/ciudades", ciudadesRouter);
router.use("/estados", estadosRouter);

module.exports = router;
