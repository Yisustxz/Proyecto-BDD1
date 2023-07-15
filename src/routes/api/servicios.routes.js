const { Router } = require("express");

const {
  getServicios,
  getServiciosById,
  addServicio,
  updateServicio,
  deleteServicio,
} = require("../../controllers/servicios.controller");
const { schemaValidator } = require("../../middleware/schemaValidator");
const {
  servicioSchema,
  servicioSchemaU,
} = require("../../schemas/servicios.schemas");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getServicios);
router.get("/:cod", getServiciosById);
router.post("/", schemaValidator(servicioSchema), addServicio);
router.put("/:cod", schemaValidator(servicioSchemaU), updateServicio);
router.delete("/:cod", deleteServicio);

module.exports = router;
