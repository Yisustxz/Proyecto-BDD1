const { z } = require("zod");

const actividadSchema = z.object({
  cod_servicio: z
    .string()
    .nonempty("Debe indicar un código de servicio")
    .max(3, "El código debe tener como máximo 3 caracteres"),
  descripcion_actividad: z
    .string()
    .nonempty("Debe indicar una descripción de la actividad"),
  costo_actividad: z
    .number()
    .positive("El costo de la actividad debe ser mayor a 0"),
});

const actividadSchemaU = z.object({
  descripcion_actividad: z
    .string()
    .nonempty("Debe indicar una descripción de la actividad"),
  costo_actividad: z
    .number()
    .positive("El costo de la actividad debe ser mayor a 0"),
});

module.exports = {
  actividadSchema,
  actividadSchemaU,
};
