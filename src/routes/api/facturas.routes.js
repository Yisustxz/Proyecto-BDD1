const { Router } = require("express");

const {
  getFacturas,
  getFacturaById,
  addFactura,
  updateFacturas,
  deleteFactura,
} = require("../../controllers/facturas.controller");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getFacturas);
router.get("/:id", getFacturaById);
router.post("/", addFactura);
router.put("/:id", updateFacturas);
router.delete("/:id", deleteFactura);

module.exports = router;
