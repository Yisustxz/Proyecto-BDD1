const { Router } = require("express");

const {
  getServicios,
  getServiciosById,
  addServicio,
  updateServicio,
  deleteServicio,
} = require("../../controllers/servicios.controller");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getServicios);
router.get("/:cod", getServiciosById);
router.post("/", addServicio);
router.put("/:cod", updateServicio);
router.delete("/:cod", deleteServicio);

module.exports = router;
