const { Router } = require("express");

const {
  getActividades,
  getActividadById,
  addActividad,
  updateActividad,
  deleteActividad,
} = require("../../controllers/actividades.controller");
const { schemaValidator } = require("../../middleware/schemaValidator");
const {
  actividadSchema,
  actividadSchemaU,
} = require("../../schemas/actividades.schemas");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getActividades);
router.get("/:cod/:num", getActividadById);
router.post("/", schemaValidator(actividadSchema), addActividad);
router.put("/:cod/:num", schemaValidator(actividadSchemaU), updateActividad);
router.delete("/:cod/:num", deleteActividad);

module.exports = router;
