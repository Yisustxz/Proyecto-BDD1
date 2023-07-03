const { Router } = require("express");

const {
  getDescuentos,
  getDescuentosById,
  addDescuento,
  updateDescuento,
  deleteDescuento,
} = require("../../controllers/descuentos.controller");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getDescuentos);
router.get("/:porcentaje", getDescuentosById);
router.post("/", addDescuento);
router.put("/:porcentaje", updateDescuento);
router.delete("/:porcentaje", deleteDescuento);

module.exports = router;
