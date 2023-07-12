const { Router } = require('express')

const {
  getSeLeHacen,
  getSeLeHacenById,
  addSeLeHacen,
  deleteSeLeHacen
} = require('../../controllers/se_le_hacen.controller')

const { seLeHacenSchema } = require('../../schemas/se_le_hacen.schemas')

const { schemaValidator } = require('../../middleware/schemaValidator')

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router()

router.get('/', getSeLeHacen)
router.get('/:placa/:cod/:num/', getSeLeHacenById)
router.post('/', schemaValidator(seLeHacenSchema), addSeLeHacen)
router.delete('/:placa/:cod/:num', deleteSeLeHacen)

module.exports = router
