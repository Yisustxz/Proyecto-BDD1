const { Router } = require('express')

const {
  getFamiliaProductos,
  getFamiliaProductosById,
  addFamiliaProducto,
  updateFamiliaProducto,
  deleteFamiliaProducto
} = require('../../controllers/familia_productos.controller')

const {
  familiaProductoSchema,
  familiaProductoSchemaU
} = require('../../schemas/familia_producto.schemas')
const { schemaValidator } = require('../../middleware/schemaValidator')

const router = Router()

router.get('/', getFamiliaProductos)
router.get('/:id', getFamiliaProductosById)
router.post('/', schemaValidator(familiaProductoSchema), addFamiliaProducto)
router.put(
  '/:id',
  schemaValidator(familiaProductoSchemaU),
  updateFamiliaProducto
)
router.delete('/:id', deleteFamiliaProducto)

module.exports = router
