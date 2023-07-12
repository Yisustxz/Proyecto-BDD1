const { z } = require('zod')

const reservaSchema = z.object({
  cod_reserva: z
    .string()
    .nonempty('Es necesario indicar un codigo de reserva')
    .max(6, 'El codigo de reserva es demasiado largo'),
  placa: z
    .string()
    .nonempty('Es necesario indicar la placa del vehiculo')
    .max(10, 'El numero de placa es demasiado largo'),
  cod_servicio: z
    .string()
    .nonempty('Es necesario indicar un codigo de servicio')
    .max(3, 'El codigo de servicio es demasiado largo'),
  fecha_reservada: z
    .string()
    .nonempty('Es necesario indicar la fecha de reserva')
    .refine(
      (fecha) => {
        const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
        return regex.test(fecha)
      },
      {
        message:
          'La fecha debe estar en formato DD-MM-AAAA y ser una fecha válida'
      }
    ),
  asistio: z.boolean(),
  kilometraje: z.number()
})

const reservaSchemaU = z.object({
  placa: z
    .string()
    .nonempty('Es necesario indicar la placa del vehiculo')
    .max(10, 'El numero de placa es demasiado largo'),
  cod_servicio: z
    .string()
    .nonempty('Es necesario indicar un codigo de servicio')
    .max(3, 'El codigo de servicio es demasiado largo'),
  fecha_reservada: z
    .string()
    .nonempty('Es necesario indicar la fecha de reserva')
    .refine(
      (fecha) => {
        const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
        return regex.test(fecha)
      },
      {
        message:
          'La fecha debe estar en formato DD-MM-AAAA y ser una fecha válida'
      }
    ),
  asistio: z.boolean(),
  kilometraje: z.number()
})

module.exports = { reservaSchema, reservaSchemaU }
