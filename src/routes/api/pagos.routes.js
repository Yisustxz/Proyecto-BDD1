const { Router } = require("express");

const {
  getPagos,
  getPagoById,
  addPago,
  updatePago,
  deletePago,
} = require("../../controllers/pagos.controller");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getPagos);
router.get("/:cod/:num", getPagoById);
router.post("/", addPago);
router.put("/:cod/:num", updatePago);
router.delete("/:cod/:num", deletePago);

module.exports = router;
