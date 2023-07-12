const { z } = require('zod')

const poseeSchema = z.object({
  rif: z
    .string()
    .nonempty('Es necesario indicar un rif del concesionario')
    .max(10, 'El RIF es demasiado largo'),
  cod_modelo: z
    .string()
    .nonempty('Es necesario indicar un codigo de un modelo')
    .max(5, 'El codigo de modelo es demasiado largo')
})

module.exports = { poseeSchema }
