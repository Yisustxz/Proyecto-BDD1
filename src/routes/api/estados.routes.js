const { Router } = require("express");

const {
  getEstados,
  getEstadosById,
  addEstado,
  updateEstado,
  deleteEstado,
} = require("../../controllers/estados.controller");
const { schemaValidator } = require("../../middleware/schemaValidator");
const {
  estadoSchema,
  estadoSchemaU,
} = require("../../schemas/estados.schemas");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getEstados);
router.get("/:cod", getEstadosById);
router.post("/", schemaValidator(estadoSchema), addEstado);
router.put("/:cod", schemaValidator(estadoSchemaU), updateEstado);
router.delete("/:cod", deleteEstado);

module.exports = router;
