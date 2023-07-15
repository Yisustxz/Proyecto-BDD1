const { Router } = require("express");

const {
  getConcesionarios,
  getConcesionarioById,
  addConcesionario,
  updateConcesionario,
  deleteConcesionario,
} = require("../../controllers/concesionario.controller");
const { schemaValidator } = require("../../middleware/schemaValidator");
const {
  concesionarioSchema,
  concesionarioSchemaU,
} = require("../../schemas/concesarios.schemas");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getConcesionarios);
router.get("/:rif", getConcesionarioById);
router.post("/", schemaValidator(concesionarioSchema), addConcesionario);
router.put("/:rif", schemaValidator(concesionarioSchemaU), updateConcesionario);
router.delete("/:rif", deleteConcesionario);

module.exports = router;
