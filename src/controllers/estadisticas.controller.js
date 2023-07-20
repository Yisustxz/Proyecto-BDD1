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
      text: 'WITH cantAtendidosPeriodo AS ( SELECT m.cod_modelo,m.nombre_modelo,m.marca,COUNT(num_unico) AS veces_atendido FROM modelos m INNER JOIN vehiculos v USING(cod_modelo) INNER JOIN ordenes_servicio os USING (placa) WHERE fecha_entrada BETWEEN $1 AND $2 GROUP BY m.cod_modelo, m.nombre_modelo, m.marca), maxAtendidos AS (SELECT MAX(veces_atendido) AS maximo_atendido FROM cantAtendidosPeriodo)  SELECT  cod_modelo, nombre_modelo, marca, veces_atendido FROM cantAtendidosPeriodo, maxAtendidos WHERE veces_atendido = (SELECT maximo_atendido FROM maxAtendidos)',
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

module.exports = {
  getModelosVehiculosPeriodo
}
