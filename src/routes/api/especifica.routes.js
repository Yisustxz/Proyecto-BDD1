const { Router } = require("express");

const {
  getEspecifica,
  getEspecificaById,
  addEspecifica,
  deleteEspecifica,
} = require("../../controllers/especifica.controller");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getEspecifica);
router.get("/:unic/:detail/:cod/:num", getEspecificaById);
router.post("/", addEspecifica);
router.delete("/:unic/:detail/:cod/:num", deleteEspecifica);

module.exports = router;
