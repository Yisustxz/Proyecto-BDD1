const { Router } = require('express')
const {
  getVehiculos,
  getVehiculosById,
  addVehiculos,
  updateVehiculos,
  deleteVehiculos
} = require('../../controllers/vehiculos.controller')

const {
  vehiculoSchema,
  vehiculoSchemaU
} = require('../../schemas/vehiculos.schemas')

const { schemaValidator } = require('../../middleware/schemaValidator')

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router()

router.get('/', getVehiculos)
router.get('/:id', getVehiculosById)
router.post('/', schemaValidator(vehiculoSchema), addVehiculos)
router.put('/:id', schemaValidator(vehiculoSchemaU), updateVehiculos)
router.delete('/:id', deleteVehiculos)

module.exports = router
