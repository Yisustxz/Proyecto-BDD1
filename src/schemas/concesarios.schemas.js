const { z } = require("zod");

const concesionarioSchema = z.object({
  rif: z
    .string()
    .nonempty("Es necesario indicar un rif para el concesionario")
    .max(10, "El rif debe tener máximo 10 caracteres"),
  nombre: z
    .string()
    .nonempty("Es necesario indicar el nombre del concesionario")
    .max(15, "El nombre debe tener máximo 15 caracteres"),
  cod_est: z
    .string()
    .nonempty("Es necesario indicar un codigo de estado")
    .max(4, "El código de estado debe tener máximo 4 caracteres"),
  num_consecutivo: z.number().int("El numero debe ser entero"),
  ci_encargado: z
    .string()
    .nonempty("Es necesario indicar la cédula del encargado")
    .max(8, "La cedula tiene maximo 8 caracteres"),
});

const concesionarioSchemaU = z.object({
  nombre: z
    .string()
    .nonempty("Es necesario indicar el nombre del concesionario")
    .max(15, "El nombre debe tener máximo 15 caracteres"),
  cod_est: z
    .string()
    .nonempty("Es necesario indicar un codigo de estado")
    .max(4, "El código de estado debe tener máximo 4 caracteres"),
  num_consecutivo: z.number().int("El numero debe ser entero"),
  ci_encargado: z
    .string()
    .nonempty("Es necesario indicar la cédula del encargado")
    .max(8, "La cedula tiene maximo 8 caracteres"),
});

module.exports = { concesionarioSchema, concesionarioSchemaU };
