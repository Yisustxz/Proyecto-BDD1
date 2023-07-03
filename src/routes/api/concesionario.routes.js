const { Router } = require("express");

const {
  getConcesionarios,
  getConcesionarioById,
  addConcesionario,
  updateConcesionario,
  deleteConcesionario,
} = require("../../controllers/concesionario.controller");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getConcesionarios);
router.get("/:rif", getConcesionarioById);
router.post("/", addConcesionario);
router.put("/:rif", updateConcesionario);
router.delete("/:rif", deleteConcesionario);

module.exports = router;
