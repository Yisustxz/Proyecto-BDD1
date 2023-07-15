const { z } = require("zod");

const ciudadSchema = z.object({
  cod_est: z
    .string()
    .nonempty("Es necesario indicar un codigo de estado")
    .max(4, "El código de estado debe tener máximo 4 caracteres"),
  nombre_ciudad: z
    .string()
    .nonempty("Es necesario indicar el nombre de la ciudad")
    .max(20, "El nombre de la ciudad debe tener máximo 20 caracteres"),
});

const ciudadSchemaU = z.object({
  nombre_ciudad: z
    .string()
    .nonempty("Es necesario indicar el nombre de la ciudad")
    .max(20, "El nombre de la ciudad debe tener máximo 20 caracteres"),
});

module.exports = { ciudadSchema, ciudadSchemaU };
