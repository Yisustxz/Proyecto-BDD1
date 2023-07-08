const { Router } = require("express");

const {
  getSeEspecializa,
  getSeEspecializaById,
  addSeEspecializa,
  deleteSeEspecializa,
} = require("../../controllers/se_especializa.controller");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getSeEspecializa);
router.get("/:id/:cod", getSeEspecializaById);
router.post("/", addSeEspecializa);
router.delete("/:id/:cod", deleteSeEspecializa);

module.exports = router;
