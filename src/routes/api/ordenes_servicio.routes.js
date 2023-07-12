const { Router } = require("express");
const {
  getOrdenesServicio,
  getOrdenesServicioById,
  addOrdenServicio,
  updateOrdenServicio,
  deleteOrdenServicio,
} = require("../../controllers/ordenes_servicio.controller");
const { schemaValidator } = require("../../middleware/schemaValidator");
const {
  ordenServicioSchema,
  ordenServicioSchemaU,
} = require("../../schemas/ordenes_servicio.schemas");
/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getOrdenesServicio);
router.get("/:id", getOrdenesServicioById);
router.post("/", schemaValidator(ordenServicioSchema), addOrdenServicio);
router.put("/:id", schemaValidator(ordenServicioSchemaU), updateOrdenServicio);
router.delete("/:id", deleteOrdenServicio);

module.exports = router;
