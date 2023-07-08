const { Router } = require("express");

const {
  getActividades,
  getActividadById,
  addActividad,
  updateActividad,
  deleteActividad,
} = require("../../controllers/actividades.controller");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getActividades);
router.get("/:cod/:num", getActividadById);
router.post("/", addActividad);
router.put("/:cod/:num", updateActividad);
router.delete("/:cod/:num", deleteActividad);

module.exports = router;
