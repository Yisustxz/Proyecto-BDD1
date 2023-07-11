const { z } = require("zod");

const servicioSchema = z.object({
  cod_servicio: z
    .string()
    .nonempty("Es necesario indicar el nombre del servicio")
    .max(3, "El codigo del servicio puede tener máximo 3 caracteres"),
  nombre_servicio: z
    .string()
    .nonempty("Es necesario indicar el nombre del servicio")
    .max(20, "El nombre del servicio puede tener máximo 20 caracteres"),
  descripcion_servicio: z
    .string()
    .nonempty("Es necesario indicar una descripción para el servicio"),
  tiempo_reserva: z
    .number()
    .int("El numero debe ser entero")
    .gte(1, "El tiempo de reserva debe ser mínimo 1 día")
    .lte(7, "El tiempo de reserva puede ser máximo de una semana"),
  capacidad: z
    .number()
    .int("La capacidad debe ser un numero entero")
    .nonnegative(),
  ci_trabajador: z
    .string()
    .nonempty("La cédula del encargado no puede ser vacía")
    .max(8, "La cedula puede tener máximo 8 digitos"),
  porcentaje: z
    .number()
    .positive("El porcentaje debe ser mayor a 0")
    .lte(100, "El maximo porcentaje es 100"),
});

const servicioSchemaU = z.object({
  nombre_servicio: z
    .string()
    .nonempty("Es necesario indicar el nombre del servicio")
    .max(20, "El nombre del servicio puede tener máximo 20 caracteres"),
  descripcion_servicio: z
    .string()
    .nonempty("Es necesario indicar una descripción para el servicio"),
  tiempo_reserva: z
    .number()
    .int("El numero debe ser entero")
    .gte(1, "El tiempo de reserva debe ser mínimo 1 día")
    .lte(7, "El tiempo de reserva puede ser máximo de una semana"),
  capacidad: z
    .number()
    .int("La capacidad debe ser un numero entero")
    .nonnegative(),
  ci_trabajador: z
    .string()
    .nonempty("La cédula del encargado no puede ser vacía")
    .max(8, "La cedula puede tener máximo 8 digitos"),
  porcentaje: z
    .number()
    .positive("El porcentaje debe ser mayor a 0")
    .lte(100, "El maximo porcentaje es 100"),
});

module.exports = {
  servicioSchema,
  servicioSchemaU,
};
