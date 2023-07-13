const { Router } = require('express')

const {
  getUtiliza,
  getUtilizaById,
  addUtiliza,
  deleteUtiliza
} = require('../../controllers/utiliza.controller')

const { utilizaSchema } = require('../../schemas/utiliza.schemas')

const { schemaValidator } = require('../../middleware/schemaValidator')

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router()

router.get('/', getUtiliza)
router.get('/:unic/:detail/:cod/:num', getUtilizaById)
router.post('/', schemaValidator(utilizaSchema), addUtiliza)
router.delete('/:unic/:detail/:cod/:num', deleteUtiliza)

module.exports = router
