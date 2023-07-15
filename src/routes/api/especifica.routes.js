const { Router } = require("express");

const {
  getEspecifica,
  getEspecificaById,
  addEspecifica,
  deleteEspecifica,
} = require("../../controllers/especifica.controller");
const { schemaValidator } = require("../../middleware/schemaValidator");
const { especificaSchema } = require("../../schemas/especifica.schemas");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getEspecifica);
router.get("/:unic/:detail/:cod/:num", getEspecificaById);
router.post("/", schemaValidator(especificaSchema), addEspecifica);
router.delete("/:unic/:detail/:cod/:num", deleteEspecifica);

module.exports = router;
