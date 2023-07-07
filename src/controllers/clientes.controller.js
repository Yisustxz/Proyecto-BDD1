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

const getClientes = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query

    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const isEmpty = await pool.query('SELECT * FROM clientes')
    if (isEmpty.rowCount === 0) {
      throw new Error('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const response = await pool.query({
      text: 'SELECT * FROM clientes ORDER BY ci_cliente LIMIT $1 OFFSET $2',
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

const getClientesById = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM clientes WHERE ci_cliente = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el cliente de CI: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const getClienteFromRequestBody = (requestBody) => {
  const {
    ci_cliente,
    nombre_cliente,
    correo,
    telefono_principal,
    telefono_secundaria
  } = requestBody

  const newCliente = [
    ci_cliente,
    nombre_cliente,
    correo,
    telefono_principal,
    telefono_secundaria
  ]

  return newCliente
}

const getClienteFromRequestBodyU = (requestBody) => {
  const { nombre_cliente, correo, telefono_principal, telefono_secundaria } =
    requestBody

  const newCliente = [
    nombre_cliente,
    correo,
    telefono_principal,
    telefono_secundaria
  ]

  return newCliente
}

const addCliente = async (req, res) => {
  try {
    const newCliente = getClienteFromRequestBody(req.body)

    const insertar = await pool.query({
      text: 'INSERT INTO clientes (ci_cliente, nombre_cliente, correo, telefono_principal,telefono_secundaria) VALUES ($1, $2, $3, $4, $5) RETURNING ci_cliente',
      values: newCliente
    })
    const insertedCi = insertar.rows[0].ci_cliente
    const response = await pool.query({
      text: 'SELECT * FROM clientes WHERE ci_cliente = $1',
      values: [insertedCi]
    })
    return successItemsResponse(res, STATUS_CREATED, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const updateCliente = async (req, res) => {
  try {
    const updateCliente = getClienteFromRequestBodyU(req.body)
    updateCliente.push(req.params.id)
    const response = await pool.query({
      text: 'UPDATE clientes SET nombre_cliente = $1, correo = $2, telefono_principal = $3,telefono_secundaria = $4 WHERE ci_cliente = $5',
      values: updateCliente
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el cliente de CI: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'Cliente modificado exitosamente')
  } catch (error) {
    res.send(error.message)
  }
}

const deleteCliente = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM clientes WHERE ci_cliente = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el cliente de CI: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'El Cliente ha sido eliminado')
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = {
  getClientes,
  getClientesById,
  addCliente,
  updateCliente,
  deleteCliente
}
