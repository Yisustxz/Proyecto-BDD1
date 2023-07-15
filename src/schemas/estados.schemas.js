const { z } = require("zod");

const estadoSchema = z.object({
  cod_est: z
    .string()
    .nonempty("Es necesario indicar un codigo de estado")
    .max(4, "El código de estado debe tener máximo 4 caracteres"),
  nombre_est: z
    .string()
    .nonempty("Es necesario indicar el nombre del estado")
    .max(20, "El nombre del estado debe tener máximo 20 caracteres"),
});

const estadoSchemaU = z.object({
  nombre_est: z
    .string()
    .nonempty("Es necesario indicar el nombre del estado")
    .max(20, "El nombre del estado debe tener máximo 20 caracteres"),
});

module.exports = { estadoSchema, estadoSchemaU };
