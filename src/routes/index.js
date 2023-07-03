const express = require("express");
const familiaProductosRouter = require("./api/familia_productos.routes");
const ciudadesRouter = require("./api/ciudades.routes");
const estadosRouter = require("./api/estados.routes");
const concesionarioRouter = require("./api/concesionario.routes");
const router = express.Router();

router.use("/familia_productos", familiaProductosRouter);
router.use("/ciudades", ciudadesRouter);
router.use("/estados", estadosRouter);
router.use("/concesionario", concesionarioRouter);

module.exports = router;
