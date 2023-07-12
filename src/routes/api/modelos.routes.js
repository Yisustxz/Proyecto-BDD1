const { Router } = require('express')
const {
  getModelos,
  getModelosById,
  addModelos,
  updateModelos,
  deleteModelos
} = require('../../controllers/modelos.controller')

const {
  modelosSchema,
  modelosSchemaU
} = require('../../schemas/modelos.schemas')

const { schemaValidator } = require('../../middleware/schemaValidator')

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router()

router.get('/', getModelos)
router.get('/:id', getModelosById)
router.post('/', schemaValidator(modelosSchema), addModelos)
router.put('/:id', schemaValidator(modelosSchemaU), updateModelos)
router.delete('/:id', deleteModelos)

module.exports = router
