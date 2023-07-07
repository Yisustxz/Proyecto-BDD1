const { Router } = require('express')
const {
  getDetalleServicio,
  getDetalleServicioById,
  addDetalleServicio,
  updateDetalleServicio,
  deleteDetalleServicio
} = require('../../controllers/detalles_servicio.controller')
/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router()

router.get('/', getDetalleServicio)
router.get('/:num/:cod', getDetalleServicioById)
router.post('/', addDetalleServicio)
router.put('/:num/:cod', updateDetalleServicio)
router.delete('/:num/:cod', deleteDetalleServicio)

module.exports = router
