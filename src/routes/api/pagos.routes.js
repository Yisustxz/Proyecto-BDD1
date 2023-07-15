const { Router } = require("express");

const {
  getPagos,
  getPagoById,
  addPago,
  updatePago,
  deletePago,
} = require("../../controllers/pagos.controller");
const { schemaValidator } = require("../../middleware/schemaValidator");
const { pagoSchema, pagoSchemaU } = require("../../schemas/pagos.schemas");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getPagos);
router.get("/:cod/:num", getPagoById);
router.post("/", schemaValidator(pagoSchema), addPago);
router.put("/:cod/:num", schemaValidator(pagoSchemaU), updatePago);
router.delete("/:cod/:num", deletePago);

module.exports = router;
