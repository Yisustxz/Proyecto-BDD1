const { Router } = require("express");

const {
  getCiudades,
  getCiudadesById,
  addCiudad,
  updateCiudad,
  deleteCiudad,
} = require("../../controllers/ciudades.controller");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getCiudades);
router.get("/:cod/:num", getCiudadesById);
router.post("/", addCiudad);
router.put("/:cod/:num", updateCiudad);
router.delete("/:cod/:num", deleteCiudad);

module.exports = router;
