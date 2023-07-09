const { z } = require('zod')

const familiaProductoSchema = z.object({
  cod_tipo: z
    .string()
    .nonempty('Es necesario indicar un codigo de tipo de producto')
    .max(6, 'El código de tipo es demasiado largo'),
  nombre: z
    .string()
    .nonempty('Es necesario indicar un nombre del tipo de producto')
    .max(15, 'El nombre debe ser menor a 15 carácteres')
  /*   fecha_creacion: z
    .string()
    .refine(
      (fecha) => {
        const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
        return regex.test(fecha)
      },
      {
        message:
          'La fecha debe estar en formato DD-MM-AAAA y ser una fecha válida'
      }
    )
    .nullable()
    .optional() */
})

module.exports = { familiaProductoSchema }
