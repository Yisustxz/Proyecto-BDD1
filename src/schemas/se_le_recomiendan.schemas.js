const { z } = require("zod");

const seLeRecomiendanSchema = z.object({
  cod_modelo: z
    .string()
    .nonempty("Es necesario indicar el código del modelo")
    .max(5, "El código del modelo tiene máximo 5 caracteres"),
  cod_servicio: z
    .string()
    .nonempty("Es necesario indicar el código del servicio")
    .max(3, "El codigo del servicio puede tener máximo 3 caracteres"),
  kilometraje: z.number().positive("El kilometraje debe ser mayor a 0"),
  tiempo_uso: z
    .number()
    .int("El tiempo de uso debe ser un entero")
    .positive("El tiempo de uso debe ser mayor a 0"),
});

module.exports = { seLeRecomiendanSchema };
