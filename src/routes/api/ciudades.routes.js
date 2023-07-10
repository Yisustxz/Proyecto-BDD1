const { Router } = require("express");

const {
  getCiudades,
  getCiudadesById,
  addCiudad,
  updateCiudad,
  deleteCiudad,
} = require("../../controllers/ciudades.controller");
const { schemaValidator } = require("../../middleware/schemaValidator");
const {
  ciudadSchema,
  ciudadSchemaU,
} = require("../../schemas/ciudades.schemas");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getCiudades);
router.get("/:cod/:num", getCiudadesById);
router.post("/", schemaValidator(ciudadSchema), addCiudad);
router.put("/:cod/:num", schemaValidator(ciudadSchemaU), updateCiudad);
router.delete("/:cod/:num", deleteCiudad);

module.exports = router;
