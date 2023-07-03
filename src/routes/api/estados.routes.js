const { Router } = require("express");

const {
  getEstados,
  getEstadosById,
  addEstado,
  updateEstado,
  deleteEstado,
} = require("../../controllers/estados.controller");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getEstados);
router.get("/:cod", getEstadosById);
router.post("/", addEstado);
router.put("/:cod", updateEstado);
router.delete("/:cod", deleteEstado);

module.exports = router;
