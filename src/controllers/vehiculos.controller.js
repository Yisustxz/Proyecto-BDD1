const { pool } = require('../database')

const {
  paginatedItemsResponse,
  successItemsResponse,
  successResponse
} = require('../utils/response')
/* import StatusError from '../utils/status-error'
import { handleControllerError } from '../utils/handleControllerError' */

const STATUS_OK = 200
const STATUS_CREATED = 201
const STATUS_NOT_FOUND = 404

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 10

const getVehiculos = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query

    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const isEmpty = await pool.query('SELECT * FROM vehiculos')
    if (isEmpty.rowCount === 0) {
      throw new Error('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const response = await pool.query({
      text: 'SELECT * FROM vehiculos ORDER BY placa LIMIT $1 OFFSET $2',
      values: [size, offset]
    })
    const pagination = {
      total: isEmpty.rowCount,
      currentPage: Number(page),
      perPage: Number(size)
    }

    return paginatedItemsResponse(res, STATUS_OK, response.rows, pagination)
  } catch (error) {
    res.send(error.message)
  }
}

const getVehiculosById = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM vehiculos WHERE placa = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el vehiculo de placa: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const getVehiculosFromRequestBody = (requestBody) => {
  const {
    placa,
    ano_vehiculo,
    num_serial,
    num_motor,
    color,
    fecha_venta,
    concesionario_vendedor,
    info_importante,
    cod_modelo,
    ci_cliente
  } = requestBody

  const newVehiculo = [
    placa,
    ano_vehiculo,
    num_serial,
    num_motor,
    color,
    fecha_venta,
    concesionario_vendedor,
    info_importante,
    cod_modelo,
    ci_cliente
  ]

  return newVehiculo
}

const getVehiculosFromRequestBodyU = (requestBody) => {
  const {
    ano_vehiculo,
    num_serial,
    num_motor,
    color,
    fecha_venta,
    concesionario_vendedor,
    info_importante,
    cod_modelo,
    ci_cliente
  } = requestBody

  const newModelo = [
    ano_vehiculo,
    num_serial,
    num_motor,
    color,
    fecha_venta,
    concesionario_vendedor,
    info_importante,
    cod_modelo,
    ci_cliente
  ]

  return newModelo
}

const addVehiculos = async (req, res) => {
  try {
    const newVehiculos = getVehiculosFromRequestBody(req.body)

    const insertar = await pool.query({
      text: 'INSERT INTO vehiculos (placa, ano_vehiculo, num_serial, num_motor, color ,fecha_venta,concesionario_vendedor, info_importante, cod_modelo, ci_cliente) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING placa',
      values: newVehiculos
    })
    const insertedPlaca = insertar.rows[0].placa
    const response = await pool.query({
      text: 'SELECT * FROM vehiculos WHERE placa = $1',
      values: [insertedPlaca]
    })
    return successItemsResponse(res, STATUS_CREATED, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const updateVehiculos = async (req, res) => {
  try {
    const updateVehiculos = getVehiculosFromRequestBodyU(req.body)
    updateVehiculos.push(req.params.id)
    const response = await pool.query({
      text: 'UPDATE vehiculos SET ano_vehiculo = $1, num_serial = $2, num_motor = $3, color = $4,fecha_venta = $5,concesionario_vendedor = $6, info_importante = $7, cod_modelo = $8, ci_cliente = $9 WHERE placa = $10',
      values: updateVehiculos
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el vehiculo de placa: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'Vehiculo modificado exitosamente')
  } catch (error) {
    res.send(error.message)
  }
}

const deleteVehiculos = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM vehiculos WHERE placa = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el vehiculo de codigo: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'El vehiculo ha sido eliminado')
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = {
  getVehiculos,
  getVehiculosById,
  addVehiculos,
  updateVehiculos,
  deleteVehiculos
}
