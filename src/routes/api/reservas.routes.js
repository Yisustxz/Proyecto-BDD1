const { Router } = require('express')

const {
  getReservas,
  getReservaById,
  addReserva,
  updateReserva,
  deleteReserva
} = require('../../controllers/reservas.controller')

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router()

router.get('/', getReservas)
router.get('/:cod', getReservaById)
router.post('/', addReserva)
router.put('/:cod', updateReserva)
router.delete('/:cod', deleteReserva)

module.exports = router
