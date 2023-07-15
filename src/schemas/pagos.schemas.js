const { z } = require("zod");

const pagoSchema = z.object({
  num_factura: z
    .string()
    .nonempty("Es necesario indicar el número de la factura")
    .max(10, "El numero de la factura puede tener maximo 10 dígitos"),
  modalidad: z.enum(["EB", "ED", "T", "TD", "TC"]),
  fecha_pago: z.string().refine(
    (fecha) => {
      const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/;
      return regex.test(fecha);
    },
    { message: "La fecha debe estar en formato YYYY-MM-DD y ser válida" }
  ),
  monto: z.number().positive("El monto debe ser mayor a 0"),
  num_tarjeta: z
    .string()
    .max(18, "El número de tarjeta tiene como máximo 18 digitos")
    .nullable()
    .optional(),
  num_banco: z
    .string()
    .max(20, "El número del banco tiene como máximo 20 dígitos")
    .nullable()
    .optional(),
});

const pagoSchemaU = z.object({
  modalidad: z.enum(["EB", "ED", "T", "TD", "TC"]),
  fecha_pago: z.string().refine(
    (fecha) => {
      const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/;
      return regex.test(fecha);
    },
    { message: "La fecha debe estar en formato YYYY-MM-DD y ser válida" }
  ),
  monto: z.number().positive("El monto debe ser mayor a 0"),
  num_tarjeta: z
    .string()
    .max(18, "El número de tarjeta tiene como máximo 18 digitos")
    .nullable()
    .optional(),
  num_banco: z
    .string()
    .max(20, "El número del banco tiene como máximo 20 dígitos")
    .nullable()
    .optional(),
});

module.exports = { pagoSchema, pagoSchemaU };
