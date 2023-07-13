const { Router } = require('express')

const {
  getPosee,
  getPoseeById,
  addPosee,
  deletePosee
} = require('../../controllers/posee.controller')

const { poseeSchema } = require('../../schemas/posee.schemas')

const { schemaValidator } = require('../../middleware/schemaValidator')

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router()

router.get('/', getPosee)
router.get('/:unic/:detail', getPoseeById)
router.post('/', schemaValidator(poseeSchema), addPosee)
router.delete('/:unic/:detail', deletePosee)

module.exports = router
