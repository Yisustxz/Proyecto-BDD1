const { Router } = require('express')
const {
  getTrabajadores,
  getTrabajadorById,
  addTrabajador,
  updateTrabajador,
  deleteTrabajador
} = require('../../controllers/trabajadores.controller')
/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router()

router.get('/', getTrabajadores)
router.get('/:id', getTrabajadorById)
router.post('/', addTrabajador)
router.put('/:id', updateTrabajador)
router.delete('/:id', deleteTrabajador)

module.exports = router
