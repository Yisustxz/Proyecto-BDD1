const { Router } = require('express')
const {
  getEncargados,
  getEncargadoById,
  addEncargado,
  updateEncargado,
  deleteEncargado
} = require('../../controllers/encargados.controller')

const {
  encargadosSchema,
  encargadosSchemaU
} = require('../../schemas/encargados.schemas')

const { schemaValidator } = require('../../middleware/schemaValidator')

const router = Router()

router.get('/', getEncargados)
router.get('/:id', getEncargadoById)
router.post('/', schemaValidator(encargadosSchema), addEncargado)
router.put('/:id', schemaValidator(encargadosSchemaU), updateEncargado)
router.delete('/:id', deleteEncargado)

module.exports = router
