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

const getReservas = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query

    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const isEmpty = await pool.query('SELECT * FROM reserva')
    if (isEmpty.rowCount === 0) {
      throw new Error('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const response = await pool.query({
      text: 'SELECT * FROM reserva ORDER BY cod_reserva LIMIT $1 OFFSET $2',
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

const getReservaById = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM reserva WHERE cod_reserva = $1',
      values: [req.params.cod]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la reserva de codigo: ${req.params.cod}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const getReservaFromRequestBody = (requestBody) => {
  const {
    cod_reserva,
    placa,
    cod_servicio,
    fecha_reservada,
    asistio,
    kilometraje
  } = requestBody

  const newReserva = [
    cod_reserva,
    placa,
    cod_servicio,
    fecha_reservada,
    asistio,
    kilometraje
  ]

  return newReserva
}

const addReserva = async (req, res) => {
  try {
    const newReserva = getReservaFromRequestBody(req.body)

    const insertar = await pool.query({
      text: 'INSERT INTO reserva (cod_reserva,placa,cod_servicio,fecha_reservada,asistio,kilometraje) VALUES ($1, $2, $3, $4, $5, $6) RETURNING cod_reserva',
      values: newReserva
    })
    const insertedCod = insertar.rows[0].cod_reserva
    const response = await pool.query({
      text: 'SELECT * FROM reserva WHERE cod_reserva = $1',
      values: [insertedCod]
    })
    return successItemsResponse(res, STATUS_CREATED, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const getReservaFromRequestBodyU = (requestBody) => {
  const { placa, cod_servicio, fecha_reservada, asistio, kilometraje } =
    requestBody

  const newReserva = [
    placa,
    cod_servicio,
    fecha_reservada,
    asistio,
    kilometraje
  ]

  return newReserva
}

const updateReserva = async (req, res) => {
  try {
    const updatedReservas = getReservaFromRequestBodyU(req.body)
    updatedReservas.push(req.params.cod)
    const response = await pool.query({
      text: 'UPDATE reserva SET  placa = $1, cod_servicio =$2 , fecha_reservada = $3 ,asistio = $4,kilometraje = $5 WHERE cod_reserva = $6',
      values: updatedReservas
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la reserva de codigo: ${req.params.cod}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'Reserva modificada exitosamente')
  } catch (error) {
    res.send(error.message)
  }
}

const deleteReserva = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM reserva WHERE cod_reserva = $1',
      values: [req.params.cod]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la reserva de codigo: ${req.params.cod}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'La reserva ha sido eliminada')
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = {
  getReservas,
  getReservaById,
  addReserva,
  updateReserva,
  deleteReserva
}
