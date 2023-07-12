const { Router } = require('express')
const {
  getDetalleServicio,
  getDetalleServicioById,
  addDetalleServicio,
  updateDetalleServicio,
  deleteDetalleServicio
} = require('../../controllers/detalles_servicio.controller')

const {
  detalleServicioSchema,
  detalleServicioSchemaU
} = require('../../schemas/detalle_servicio.schemas')

const { schemaValidator } = require('../../middleware/schemaValidator')

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router()

router.get('/', getDetalleServicio)
router.get('/:num/:cod', getDetalleServicioById)
router.post('/', schemaValidator(detalleServicioSchema), addDetalleServicio)
router.put(
  '/:num/:cod',
  schemaValidator(detalleServicioSchemaU),
  updateDetalleServicio
)
router.delete('/:num/:cod', deleteDetalleServicio)

module.exports = router
