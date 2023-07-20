const { z } = require('zod')

const utilizaSchema = z.object({
  num_unico: z.number().int('el numero consecutivo debe ser entero'),
  num_detalle: z.number().int('el numero consecutivo debe ser entero'),
  ci_trabajador: z
    .string()
    .nonempty('Es necesario indicar una cedula del trabajador')
    .max(8, 'La cedula es demasiado larga'),
  cod_producto: z
    .string()
    .nonempty('Es necesario indicar un codigo de producto')
    .max(6, 'El codigo de prodcuto es demasiado largo'),
  precio_actual: z.number(),
  cantidad_usada: z
    .number()
    .positive('La cantidad usada tiene que ser positivo')
})

module.exports = { utilizaSchema }
