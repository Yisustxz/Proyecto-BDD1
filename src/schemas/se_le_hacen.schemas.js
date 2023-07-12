const { z } = require('zod')

const seLeHacenSchema = z.object({
  placa: z
    .string()
    .nonempty('Es necesario indicar una placa del vehiculo')
    .max(7, 'La placa del vehiculo es demasiado largo'),
  cod_servicio: z
    .string()
    .nonempty('Es necesario indicar un codigo de servicio')
    .max(3, 'El codigo del servicio es demasiado largo'),
  num_consecutivo: z.number().int('el numero consecutivo debe ser entero')
})

module.exports = { seLeHacenSchema }
