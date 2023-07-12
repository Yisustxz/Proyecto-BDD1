const { z } = require('zod')

const clientesSchema = z.object({
  ci_cliente: z
    .string()
    .nonempty('Es necesario indicar una cedula del cliente')
    .max(8, 'La cedula es demasiado larga'),
  nombre_cliente: z
    .string()
    .nonempty('Es necesario indicar un nombre del cliente')
    .max(40, 'El nombre debe ser menor a 40 carácteres'),
  correo: z
    .string()
    .nonempty('Es necesario indicar un correo del cliente')
    .max(40, 'El correo debe ser menor a 40 carácteres'),
  telefono_principal: z
    .string()
    .max(11, 'El numero de telefono solo puede tener 11 caracteres'),
  telefono_secundario: z
    .string()
    .max(11, 'El numero de telefono solo puede tener 11 caracteres')
})

const clientesSchemaU = z.object({
  nombre_cliente: z
    .string()
    .nonempty('Es necesario indicar un nombre del cliente')
    .max(40, 'El nombre debe ser menor a 40 carácteres'),
  correo: z
    .string()
    .nonempty('Es necesario indicar un correo del cliente')
    .max(40, 'El correo debe ser menor a 40 carácteres'),
  telefono_principal: z
    .string()
    .max(11, 'El numero de telefono solo puede tener 11 caracteres'),
  telefono_secundario: z
    .string()
    .max(11, 'El numero de telefono solo puede tener 11 caracteres')
})

module.exports = { clientesSchema, clientesSchemaU }
