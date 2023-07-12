const { z } = require('zod')

const encargadosSchema = z.object({
  ci_encargado: z
    .string()
    .nonempty('Es necesario indicar una cedula del encargado')
    .max(8, 'La cedula es demasiado larga'),
  nombre_encargado: z
    .string()
    .nonempty('Es necesario indicar un nombre del encargado')
    .max(40, 'El nombre debe ser menor a 40 carácteres'),
  direccion_encargado: z
    .string()
    .nonempty('Es necesario indicar una direccion del encargado'),
  telefono_encargado: z
    .string()
    .max(11, 'El numero de telefono solo puede tener 11 caracteres'),
  correo_encargado: z
    .string()
    .max(20, 'El correo debe ser menor a 20 caracteres'),
  telefono_secundario_encargado: z
    .string()
    .max(11, 'El numero de telefono solo puede tener 11 caracteres')
})

const encargadosSchemaU = z.object({
  nombre_encargado: z
    .string()
    .nonempty('Es necesario indicar un nombre del encargado')
    .max(40, 'El nombre debe ser menor a 40 carácteres'),
  direccion_encargado: z
    .string()
    .nonempty('Es necesario indicar una direccion del encargado'),
  telefono_encargado: z
    .string()
    .max(11, 'El numero de telefono solo puede tener 11 caracteres'),
  correo_encargado: z
    .string()
    .max(20, 'El correo debe ser menor a 20 caracteres'),
  telefono_secundario_encargado: z
    .string()
    .max(11, 'El numero de telefono solo puede tener 11 caracteres')
})

module.exports = { encargadosSchema, encargadosSchemaU }
