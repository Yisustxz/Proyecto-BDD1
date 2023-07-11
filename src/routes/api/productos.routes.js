const { Router } = require("express");

const {
  getProductos,
  getProductosById,
  addProducto,
  updateProducto,
  deleteProducto,
} = require("../../controllers/productos.controller");
const { schemaValidator } = require("../../middleware/schemaValidator");
const {
  productoSchema,
  productoSchemaU,
} = require("../../schemas/productos.schemas");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getProductos);
router.get("/:cod", getProductosById);
router.post("/", schemaValidator(productoSchema), addProducto);
router.put("/:cod", schemaValidator(productoSchemaU), updateProducto);
router.delete("/:cod", deleteProducto);

module.exports = router;
