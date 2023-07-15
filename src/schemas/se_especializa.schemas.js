const { z } = require("zod");

const seEspecializaSchema = z.object({
  ci_trabajador: z
    .string()
    .nonempty("Es necesario indicar la cédula del trabajador")
    .max(8, "La cédula tiene como máximo 8 dígitos"),
  cod_servicio: z
    .string()
    .nonempty("Es necesario indicar el código del servicio")
    .max(3, "El codigo del servicio puede tener máximo 3 caracteres"),
});

module.exports = { seEspecializaSchema };
