const { z } = require('zod')

const vehiculoSchema = z.object({
  placa: z
    .string()
    .nonempty('Es necesario indicar una placa del vehiculo')
    .max(7, 'La placa del vehiculo es demasiado largo'),
  ano_vehiculo: z
    .string()
    .nonempty('Es necesario indicar un año del vehiculo')
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
  num_serial: z
    .string()
    .nonempty('Es necesario indicar un numero de serial del carro')
    .max(10, 'El numero de serial es demasiado largo'),
  num_motor: z
    .string()
    .nonempty('Es necesario indicar un numero de serial del carro')
    .max(8, 'El numero de motor es demasiado largo '),
  color: z
    .string()
    .nonempty('Es necesario indicar un color del vehiculo')
    .max(10, 'El color ingresado es demasiado largo '),
  fecha_venta: z
    .string()
    .nonempty('Es necesario indicar la fecha de venta')
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
  concesionario_vendedor: z
    .string()
    .nonempty('es necesario indicar el concesionario vendedor')
    .max(15, 'El concesionario vendedor ingresado es demasiado largo'),
  info_importante: z
    .string()
    .nonempty('es necesario indicar informacion importante del vehiculo'),
  cod_modelo: z
    .string()
    .nonempty('Es necesario indicar el codigo de modelo del vehiculo')
    .max(5, 'El codigo de modelo ingresado es demasiado largo'),
  ci_cliente: z
    .string()
    .nonempty('Es necesario indicar la cedula del cliente')
    .max(8, 'La cedula es demasiado largo')
})

const vehiculoSchemaU = z.object({
  ano_vehiculo: z
    .string()
    .nonempty('Es necesario indicar un año del vehiculo')
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
  num_serial: z
    .string()
    .nonempty('Es necesario indicar un numero de serial del carro')
    .max(10, 'El numero de serial es demasiado largo'),
  num_motor: z
    .string()
    .nonempty('Es necesario indicar un numero de serial del carro')
    .max(8, 'El numero de motor es demasiado largo '),
  color: z
    .string()
    .nonempty('Es necesario indicar un color del vehiculo')
    .max(10, 'El color ingresado es demasiado largo '),
  fecha_venta: z
    .string()
    .nonempty('Es necesario indicar la fecha de venta')
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
  concesionario_vendedor: z
    .string()
    .nonempty('es necesario indicar el concesionario vendedor')
    .max(15, 'El concesionario vendedor ingresado es demasiado largo'),
  info_importante: z
    .string()
    .nonempty('es necesario indicar informacion importante del vehiculo'),
  cod_modelo: z
    .string()
    .nonempty('Es necesario indicar el codigo de modelo del vehiculo')
    .max(5, 'El codigo de modelo ingresado es demasiado largo'),
  ci_cliente: z
    .string()
    .nonempty('Es necesario indicar la cedula del cliente')
    .max(8, 'La cedula es demasiado largo')
})

module.exports = { vehiculoSchema, vehiculoSchemaU }
