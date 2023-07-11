const { Router } = require("express");

const {
  getDescuentos,
  getDescuentosById,
  addDescuento,
  updateDescuento,
  deleteDescuento,
} = require("../../controllers/descuentos.controller");
const { schemaValidator } = require("../../middleware/schemaValidator");
const {
  descuentoSchema,
  descuentoSchemaU,
} = require("../../schemas/descuentos.schemas");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getDescuentos);
router.get("/:porcentaje", getDescuentosById);
router.post("/", schemaValidator(descuentoSchema), addDescuento);
router.put("/:porcentaje", schemaValidator(descuentoSchemaU), updateDescuento);
router.delete("/:porcentaje", deleteDescuento);

module.exports = router;
