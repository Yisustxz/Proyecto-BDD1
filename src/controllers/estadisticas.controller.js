const { pool } = require('../database')

const {
  paginatedItemsResponse,
  successItemsResponse,
  successResponse
} = require('../utils/response')

const STATUS_OK = 200
const STATUS_NOT_FOUND = 404

const ModeloVehiculoPeriodo = (requestBody) => {
  const { fecha_inicio, fecha_final } = requestBody

  const newModeloVehiculoPeriodo = [fecha_inicio, fecha_final]

  return newModeloVehiculoPeriodo
}

const getModelosVehiculosPeriodo = async (req, res) => {
  try {
    const newEstadistica = ModeloVehiculoPeriodo(req.body)
    const response = await pool.query({
      text: 'WITH cantAtendidosPeriodo AS (SELECT m.cod_modelo,m.nombre_modelo,m.marca,COUNT(num_unico) AS veces_atendido FROM modelos m INNER JOIN vehiculos v USING(cod_modelo) INNER JOIN ordenes_servicio os USING (placa) WHERE fecha_entrada BETWEEN $1 AND $2 GROUP BY m.cod_modelo, m.nombre_modelo, m.marca), maxAtendidos AS (SELECT MAX(veces_atendido) AS maximo_atendido FROM cantAtendidosPeriodo)  SELECT  cod_modelo, nombre_modelo, marca, veces_atendido FROM cantAtendidosPeriodo, maxAtendidos WHERE veces_atendido = (SELECT maximo_atendido FROM maxAtendidos)',
      values: newEstadistica
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se encontro ningun modelo de vehiculo con el periodo dado`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows)
  } catch (error) {
    res.send(error.message)
  }
}

const ModeloVehiculoServicio = (requestBody) => {
  const { tipo_servicio } = requestBody

  const newModeloVehiculoServicio = [tipo_servicio]

  return newModeloVehiculoServicio
}

const getModelosVehiculosServicio = async (req, res) => {
  try {
    const newEstadistica = ModeloVehiculoServicio(req.body)
    const response = await pool.query({
      text: 'WITH cantAtendidosServicio AS (SELECT m.cod_modelo, m.nombre_modelo, m.marca, a.cod_servicio, COUNT(num_unico) AS veces_atendido FROM modelos m INNER JOIN vehiculos v USING(cod_modelo) INNER JOIN ordenes_servicio os USING (placa) INNER JOIN detalle_servicio ds USING (num_unico) INNER JOIN especifica e USING (num_unico) INNER JOIN actividades a ON e.cod_actividad = a.cod_servicio WHERE a.cod_servicio = $1 GROUP BY m.cod_modelo,m.nombre_modelo, m.marca,a.cod_servicio), maxAtendidos AS (SELECT MAX(veces_atendido) AS maximo_atendido FROM cantAtendidosServicio) SELECT cod_modelo,nombre_modelo,marca,cod_servicio,veces_atendido FROM cantAtendidosServicio,maxAtendidos WHERE veces_atendido = maximo_atendido',
      values: newEstadistica
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se encontro ningun modelo de vehiculo con el servicio dado`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows)
  } catch (error) {
    res.send(error.message)
  }
}

const fechaTotal = () => {
  const fechaInicio = '2023-01-01'
  const fechaFinal = '2023-12-31'

  const newTrabajadorServicio = [fechaInicio, fechaFinal]

  return newTrabajadorServicio
}

const getTrabajadorServicioMes = async (req, res) => {
  try {
    const newEstadistica = fechaTotal()
    const response = await pool.query({
      text: 'SELECT t.ci_trabajador,t.nombre_trabajador, EXTRACT(MONTH FROM os.fecha_salida_real) AS mes,COUNT(os.num_unico) AS cantidad_servicios FROM trabajadores t LEFT JOIN ordenes_servicio os ON t.ci_trabajador = os.ci_trabajador WHERE os.fecha_salida_real BETWEEN $1 AND $2 GROUP BY t.ci_trabajador, t.nombre_trabajador, mes ORDER BY mes, cantidad_servicios DESC',
      values: newEstadistica
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se encontro ningun trabajador que realizo algun servicio en el 2023`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows)
  } catch (error) {
    res.send(error.message)
  }
}

const getProductoMayor = async (req, res) => {
  try {
    const response = await pool.query({
      text: `SELECT
      p.cod_producto,
      p.nombre_producto,
      SUM(d.cantidad) AS total_salida_ventas
    FROM
      productos p
    JOIN utiliza u ON p.cod_producto = u.cod_producto
    JOIN detalle_servicio d ON u.num_unico = d.num_unico AND u.num_detalle = d.num_detalle
    GROUP BY
      p.cod_producto,
      p.nombre_producto
    ORDER BY
      total_salida_ventas DESC
    LIMIT 1`
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se encontro ningun Producto con el mayor numero de ventas`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows)
  } catch (error) {
    res.send(error.message)
  }
}

const getClientesFrecuentes = async (req, res) => {
  try {
    const newEstadistica = fechaTotal()
    const response = await pool.query({
      text: `SELECT
      c.ci_cliente,
      c.nombre_cliente,
      s.nombre_servicio,
      COUNT(os.num_unico) AS veces_contratado,
      SUM(fs.monto_total) AS monto_acumulado
    FROM
      clientes c
    LEFT JOIN vehiculos v USING (ci_cliente)
    INNER JOIN ordenes_servicio os USING(placa)
    INNER JOIN facturas fs USING(num_unico)
    INNER JOIN especifica e ON os.num_unico = e.num_unico
    RIGHT JOIN servicios s ON e.cod_actividad = s.cod_servicio
    INNER JOIN descuentos d USING (porcentaje)
    WHERE
      os.fecha_entrada BETWEEN $1 AND $2 
    GROUP BY
      c.ci_cliente,
      c.nombre_cliente,
      s.nombre_servicio,
      d.rango_min
    HAVING (COUNT(DISTINCT os.num_unico) >= d.rango_min)
    ORDER BY
      veces_contratado DESC,
      monto_acumulado DESC`,
      values: newEstadistica
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se encontro ningun trabajador que realizo algun servicio en el 2023`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows)
  } catch (error) {
    res.send(error.message)
  }
}

const getProductoMenor = async (req, res) => {
  try {
    const response = await pool.query({
      text: `SELECT
      p.cod_producto,
      p.nombre_producto,
      SUM(d.cantidad) AS total_salida_ventas
    FROM
      productos p
    JOIN utiliza u ON p.cod_producto = u.cod_producto
    JOIN detalle_servicio d ON u.num_unico = d.num_unico AND u.num_detalle = d.num_detalle
    GROUP BY
      p.cod_producto,
      p.nombre_producto
    ORDER BY
      total_salida_ventas
    LIMIT 1`
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se encontro ningun Producto con el menor numero de ventas`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows)
  } catch (error) {
    res.send(error.message)
  }
}

const getProductoEcologico = async (req, res) => {
  try {
    const response = await pool.query({
      text: `SELECT
      COUNT(*) AS total_productos,
      SUM(CASE WHEN es_ecologico = FALSE THEN 1 ELSE 0 END) AS productos_no_ecologicos,
      (SUM(CASE WHEN es_ecologico = FALSE THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS porcentaje_no_ecologicos
    FROM
      productos `
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se encontro ningun Producto ecologico para el porcentaje`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows)
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = {
  getModelosVehiculosPeriodo,
  getModelosVehiculosServicio,
  getTrabajadorServicioMes,
  getClientesFrecuentes,
  getProductoMayor,
  getProductoMenor,
  getProductoEcologico
}
