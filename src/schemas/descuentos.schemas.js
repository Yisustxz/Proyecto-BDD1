const { z } = require("zod");

const descuentoSchema = z.object({
  porcentaje: z
    .number()
    .positive("El porcentaje debe ser mayor a 0")
    .lte(100, "El maximo porcentaje es 100"),
  rango_min: z
    .number()
    .int("El numero de rango minimo debe ser entero")
    .nonnegative("El rango minimo debe ser mayor o igual a 0")
    .refine((valor) => {
      rango_minimo = valor;
      return true;
    }),
  rango_max: z
    .number()
    .int("El numero de rango maximo debe ser entero")
    .nonnegative("El rango maximo debe ser mayor o igual a 0")
    .refine((valor) => valor > rango_minimo, {
      message: "El rango maximo debe ser mayor al rango minimo",
    }),
});

const descuentoSchemaU = z.object({
  rango_min: z
    .number()
    .int("El numero de rango minimo debe ser entero")
    .nonnegative("El rango minimo debe ser mayor o igual a 0")
    .refine((valor) => {
      rango_minimo = valor;
      return true;
    }),
  rango_max: z
    .number()
    .int("El numero de rango maximo debe ser entero")
    .nonnegative("El rango maximo debe ser mayor o igual a 0")
    .refine((valor) => valor > rango_minimo, {
      message: "El rango maximo debe ser mayor al rango minimo",
    }),
});

module.exports = { descuentoSchema, descuentoSchemaU };
