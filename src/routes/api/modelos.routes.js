const { Router } = require('express')
const {
  getModelos,
  getModelosById,
  addModelos,
  updateModelos,
  deleteModelos
} = require('../../controllers/modelos.controller')
/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router()

router.get('/', getModelos)
router.get('/:id', getModelosById)
router.post('/', addModelos)
router.put('/:id', updateModelos)
router.delete('/:id', deleteModelos)

module.exports = router
