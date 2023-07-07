const { Router } = require('express')
const {
  getOrdenesServicio,
  getOrdenesServicioById,
  addOrdenServicio,
  updateOrdenServicio,
  deleteOrdenServicio
} = require('../../controllers/ordenes_servicio.controller')
/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router()

router.get('/', getOrdenesServicio)
router.get('/:id', getOrdenesServicioById)
router.post('/', addOrdenServicio)
router.put('/:id', updateOrdenServicio)
router.delete('/:id', deleteOrdenServicio)

module.exports = router
