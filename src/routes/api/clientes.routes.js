const { Router } = require('express')
const {
  getClientes,
  getClientesById,
  addCliente,
  updateCliente,
  deleteCliente
} = require('../../controllers/clientes.controller')
/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router()

router.get('/', getClientes)
router.get('/:id', getClientesById)
router.post('/', addCliente)
router.put('/:id', updateCliente)
router.delete('/:id', deleteCliente)

module.exports = router
