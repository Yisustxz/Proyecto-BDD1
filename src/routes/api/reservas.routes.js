const { Router } = require('express')

const {
  getReservas,
  getReservaById,
  addReserva,
  updateReserva,
  deleteReserva
} = require('../../controllers/reservas.controller')

const {
  reservaSchema,
  reservaSchemaU
} = require('../../schemas/reservas.schemas')

const { schemaValidator } = require('../../middleware/schemaValidator')

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router()

router.get('/', getReservas)
router.get('/:cod', getReservaById)
router.post('/', schemaValidator(reservaSchema), addReserva)
router.put('/:cod', schemaValidator(reservaSchemaU), updateReserva)
router.delete('/:cod', deleteReserva)

module.exports = router
