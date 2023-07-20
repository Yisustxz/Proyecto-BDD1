const { Router } = require('express')
const {
  getModelosVehiculosPeriodo,
  getModelosVehiculosServicio,
  getTrabajadorServicioMes,
  getClientesFrecuentes,
  getProductoMayor,
  getProductoMenor,
  getProductoEcologico
} = require('../../controllers/estadisticas.controller')

const router = Router()

router.get('/ModelosVehiculosPeriodo', getModelosVehiculosPeriodo)
router.get('/ModelosVehiculosServicio', getModelosVehiculosServicio)
router.get('/TrabajadorServicioMes', getTrabajadorServicioMes)
router.get('/ClientesFrecuentes', getClientesFrecuentes)
router.get('/ProductoMayor', getProductoMayor)
router.get('/ProductoMenor', getProductoMenor)
router.get('/ProductoEcologico', getProductoEcologico)

module.exports = router
