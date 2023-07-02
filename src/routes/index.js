const express = require('express')
const familiaProductosRouter = require('./api/familia_productos.routes')
const router = express.Router()

router.use('/familia_productos', familiaProductosRouter)
//router.use('/escuelas', escuelasRouter)
//router.use('/estudiantes', estudiantesRouter)

module.exports = router
