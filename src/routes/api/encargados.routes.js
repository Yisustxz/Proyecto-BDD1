const { Router } = require('express')
const {
  getEncargados,
  getEncargadoById,
  addEncargado,
  updateEncargado,
  deleteEncargado
} = require('../../controllers/encargados.controller')
/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router()

router.get('/', getEncargados)
router.get('/:id', getEncargadoById)
router.post('/', addEncargado)
router.put('/:id', updateEncargado)
router.delete('/:id', deleteEncargado)

module.exports = router
