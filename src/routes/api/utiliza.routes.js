const { Router } = require('express')

const {
  getUtiliza,
  getUtilizaById,
  addUtiliza,
  deleteUtiliza
} = require('../../controllers/utiliza.controller')

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router()

router.get('/', getUtiliza)
router.get('/:unic/:detail/:cod/:num', getUtilizaById)
router.post('/', addUtiliza)
router.delete('/:unic/:detail/:cod/:num', deleteUtiliza)

module.exports = router
