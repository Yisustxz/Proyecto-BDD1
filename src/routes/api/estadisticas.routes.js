const { Router } = require('express')
const {
  getModelosVehiculosPeriodo,
  getModelosVehiculosServicio
} = require('../../controllers/estadisticas.controller')

const router = Router()

router.get('/ModelosVehiculosPeriodo', getModelosVehiculosPeriodo)
router.get('/ModelosVehiculosServicio', getModelosVehiculosServicio)
/* router.get('/:id', getClientesById)
 */
module.exports = router
