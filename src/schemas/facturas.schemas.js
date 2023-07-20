const { z } = require("zod");

const facturaSchema = z.object({
  num_factura: z
    .string()
    .nonempty("Es necesario indicar el número de la factura")
    .max(10, "El numero de la factura puede tener maximo 10 dígitos"),
  costo_mano_obra: z.number(),
  monto_total: z.number(),
  fecha_factura: z.string().refine(
    (fecha) => {
      const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/;
      return regex.test(fecha);
    },
    { message: "La fecha debe estar en formato YYYY-MM-DD y ser válida" }
  ),
  num_unico: z.number().int("El numero único debe ser entero"),
});

const facturaSchemaU = z.object({
  costo_mano_obra: z
    .number()
    .positive("El costo de la mano de obra debe ser mayor a 0"),
  monto_total: z.number().positive("El monto_total debe ser mayor a 0"),
  fecha_factura: z.string().refine(
    (fecha) => {
      const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/;
      return regex.test(fecha);
    },
    { message: "La fecha debe estar en formato YYYY-MM-DD y ser válida" }
  ),
  num_unico: z.number().int("El numero único debe ser entero"),
});

module.exports = {
  facturaSchema,
  facturaSchemaU,
};
