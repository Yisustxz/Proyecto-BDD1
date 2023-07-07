const { Router } = require("express");

const {
  getProductos,
  getProductosById,
  addProducto,
  updateProducto,
  deleteProducto,
} = require("../../controllers/productos.controller");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getProductos);
router.get("/:cod", getProductosById);
router.post("/", addProducto);
router.put("/:cod", updateProducto);
router.delete("/:cod", deleteProducto);

module.exports = router;
