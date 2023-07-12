const { Router } = require('express')
const {
  getClientes,
  getClientesById,
  addCliente,
  updateCliente,
  deleteCliente
} = require('../../controllers/clientes.controller')

const {
  clientesSchema,
  clientesSchemaU
} = require('../../schemas/clientes.schemas')

const { schemaValidator } = require('../../middleware/schemaValidator')

const router = Router()

router.get('/', getClientes)
router.get('/:id', getClientesById)
router.post('/', schemaValidator(clientesSchema), addCliente)
router.put('/:id', schemaValidator(clientesSchemaU), updateCliente)
router.delete('/:id', deleteCliente)

module.exports = router
