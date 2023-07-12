const { Router } = require('express')
const {
  getTrabajadores,
  getTrabajadorById,
  addTrabajador,
  updateTrabajador,
  deleteTrabajador
} = require('../../controllers/trabajadores.controller')

const {
  trabajadoresSchema,
  trabajadoresSchemaU
} = require('../../schemas/trabajadores.schemas')

const { schemaValidator } = require('../../middleware/schemaValidator')

const router = Router()

router.get('/', getTrabajadores)
router.get('/:id', getTrabajadorById)
router.post('/', schemaValidator(trabajadoresSchema), addTrabajador)
router.put('/:id', schemaValidator(trabajadoresSchemaU), updateTrabajador)
router.delete('/:id', deleteTrabajador)

module.exports = router
