const { Router } = require('express')

const {
  getFamiliaProductos,
  getFamiliaProductosById,
  addFamiliaProducto,
  updateFamiliaProducto,
  deleteFamiliaProducto
} = require('../../controllers/familia_productos.controller')

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router()

router.get('/', getFamiliaProductos)
router.get('/:id', getFamiliaProductosById)
router.post('/', addFamiliaProducto)
router.put('/:id', updateFamiliaProducto)
router.delete('/:id', deleteFamiliaProducto)

module.exports = router
