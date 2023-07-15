const { Router } = require("express");

const {
  getFacturas,
  getFacturaById,
  addFactura,
  updateFacturas,
  deleteFactura,
} = require("../../controllers/facturas.controller");
const { schemaValidator } = require("../../middleware/schemaValidator");
const {
  facturaSchema,
  facturaSchemaU,
} = require("../../schemas/facturas.schemas");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getFacturas);
router.get("/:id", getFacturaById);
router.post("/", schemaValidator(facturaSchema), addFactura);
router.put("/:id", schemaValidator(facturaSchemaU), updateFacturas);
router.delete("/:id", deleteFactura);

module.exports = router;
