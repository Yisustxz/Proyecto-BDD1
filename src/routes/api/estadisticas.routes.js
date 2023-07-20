const { Router } = require('express')
const {
  getModelosVehiculosPeriodo
} = require('../../controllers/estadisticas.controller')

const router = Router()

router.get('/ModelosVehiculosPeriodo', getModelosVehiculosPeriodo)
/* router.get('/:id', getClientesById)
 */
module.exports = router
