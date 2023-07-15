const { z } = require("zod");

const especificaSchema = z.object({
  num_unico: z.number().int("El número único debe ser entero"),
  num_detalle: z.number().int("El número de detalle debe ser entero"),
  cod_actividad: z
    .string()
    .nonempty("Debe indicar un código de servicio para la actividad")
    .max(3, "El código puede tener como máximo 3 caracteres"),
  num_consectivo: z.number().int("El número consecutivo debe ser entero"),
});

module.exports = { especificaSchema };
