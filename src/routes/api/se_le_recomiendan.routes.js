const { Router } = require("express");

const {
  getSeLeRecomiendan,
  getSeLeRecomiendanById,
  addSeLeRecomiendan,
  deleteSeLeRecomiendan,
} = require("../../controllers/se_le_recomiendan.controller");

/* import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator' */

const router = Router();

router.get("/", getSeLeRecomiendan);
router.get("/:mod/:cod/:kil/:time", getSeLeRecomiendanById);
router.post("/", addSeLeRecomiendan);
router.delete("/:mod/:cod/:kil/:time", deleteSeLeRecomiendan);

module.exports = router;
