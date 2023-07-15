const { z } = require("zod");

let cantidad_min;
let cantidad_max;

const productoSchema = z.object({
  cod_producto: z
    .string()
    .nonempty("El codigo del producto no puede ser vacío")
    .max(6, "El codigo del producto puede tener máximo 6 caracteres"),
  nombre_producto: z
    .string()
    .nonempty("El nombre del producto no puede ser vacío")
    .max(40, "El nombre del producto puede tener máximo 40 caracteres"),
  descripcion_producto: z
    .string()
    .nonempty("Es necesario indicar una descripción del producto"),
  es_ecologico: z.boolean(),
  precio: z.number().positive("El precio debe ser mayor a 0"),
  cantidad_minima: z
    .number()
    .int()
    .nonnegative("La cantidad mínima no puede ser negativa")
    .refine((valor) => {
      cantidad_min = valor;
      return true;
    }),
  cantidad_maxima: z
    .number()
    .int()
    .nonnegative("La cantidad máxima no puede ser negativa")
    .refine(
      (valor) => {
        cantidad_max = valor;
        return valor >= cantidad_min;
      },
      {
        message: "La cantidad máxima no puede ser menor que la cantidad mínima",
      }
    ),
  cantidad: z
    .number()
    .int()
    .nonnegative("La cantidad actual no puede ser negativa")
    .refine((valor) => valor >= cantidad_min && valor <= cantidad_max, {
      message: "La cantidad actual debe estar entra la mínima y la máxima",
    }),
  cod_tipo: z
    .string()
    .nonempty("Es necesario indicar un codigo de tipo de producto")
    .max(6, "El código de tipo es demasiado largo"),
  proveedor: z
    .string()
    .nonempty("Es necesario indicar el proveedor del producto")
    .max(15, "El proveedor no puede exceder los 15 caracteres"),
});

const productoSchemaU = z.object({
  nombre_producto: z
    .string()
    .nonempty("El nombre del producto no puede ser vacío")
    .max(40, "El nombre del producto puede tener máximo 40 caracteres"),
  descripcion_producto: z
    .string()
    .nonempty("Es necesario indicar una descripción del producto"),
  es_ecologico: z.boolean(),
  precio: z.number().positive("El precio debe ser mayor a 0"),
  cantidad_minima: z
    .number()
    .int()
    .nonnegative("La cantidad mínima no puede ser negativa")
    .refine((valor) => {
      cantidad_min = valor;
      return true;
    }),
  cantidad_maxima: z
    .number()
    .int()
    .nonnegative("La cantidad máxima no puede ser negativa")
    .refine(
      (valor) => {
        cantidad_max = valor;
        return valor >= cantidad_min;
      },
      {
        message: "La cantidad máxima no puede ser menor que la cantidad mínima",
      }
    ),
  cantidad: z
    .number()
    .int()
    .nonnegative("La cantidad actual no puede ser negativa")
    .refine((valor) => valor >= cantidad_min && valor <= cantidad_max, {
      message: "La cantidad actual debe estar entra la mínima y la máxima",
    }),
  cod_tipo: z
    .string()
    .nonempty("Es necesario indicar un codigo de tipo de producto")
    .max(6, "El código de tipo es demasiado largo"),
  proveedor: z
    .string()
    .nonempty("Es necesario indicar el proveedor del producto")
    .max(15, "El proveedor no puede exceder los 15 caracteres"),
});

module.exports = {
  productoSchema,
  productoSchemaU,
};
