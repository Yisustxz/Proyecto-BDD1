const { pool } = require("../database");

const {
  paginatedItemsResponse,
  successItemsResponse,
  successResponse,
} = require("../utils/response");
/* import StatusError from '../utils/status-error'
import { handleControllerError } from '../utils/handleControllerError' */

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_NOT_FOUND = 404;

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;

const getEstados = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query;

    let offset = (Number(page) - 1) * Number(size);

    if (Number(page) < 1) {
      offset = 0;
    }

    const isEmpty = await pool.query("SELECT * FROM estados");
    if (isEmpty.rowCount === 0) {
      throw new Error("La tabla está vacía", STATUS_NOT_FOUND);
    }
    const response = await pool.query({
      text: "SELECT * FROM estados ORDER BY cod_est",
    });
    const pagination = {
      total: isEmpty.rowCount,
      currentPage: Number(page),
      perPage: Number(size),
    };

    return paginatedItemsResponse(res, STATUS_OK, response.rows, pagination);
  } catch (error) {
    res.send(error.message);
  }
};

const getEstadosById = async (req, res) => {
  try {
    const response = await pool.query({
      text: "SELECT * FROM estados WHERE cod_est = $1",
      values: [req.params.cod],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el estado de codigo: ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getEstadosFromRequestBody = (requestBody) => {
  const { cod_est, nombre_est } = requestBody;

  const newEstados = [cod_est, nombre_est];

  return newEstados;
};

const addEstado = async (req, res) => {
  try {
    const newEstado = getEstadosFromRequestBody(req.body);

    const insertar = await pool.query({
      text: "INSERT INTO estados (cod_est, nombre_est) VALUES ($1, $2) RETURNING cod_est",
      values: newEstado,
    });
    const insertedCod = insertar.rows[0].cod_est;
    const response = await pool.query({
      text: "SELECT * FROM estados WHERE cod_est = $1",
      values: [insertedCod],
    });
    return successItemsResponse(res, STATUS_CREATED, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getEstadosFromRequestBodyU = (requestBody) => {
  const { nombre_est } = requestBody;

  const newEstado = [nombre_est];

  return newEstado;
};

const updateEstado = async (req, res) => {
  try {
    const updatedEstado = getEstadosFromRequestBodyU(req.body);
    updatedEstado.push(req.params.cod);
    const response = await pool.query({
      text: "UPDATE estados SET nombre_est = $1 WHERE cod_est = $2",
      values: updatedEstado,
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el estado de codigo: ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Estado modificado exitosamente");
  } catch (error) {
    res.send(error.message);
  }
};

const deleteEstado = async (req, res) => {
  try {
    const response = await pool.query({
      text: "DELETE FROM estados WHERE cod_est = $1",
      values: [req.params.cod],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el estado de codigo: ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Estado ha sido eliminada");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getEstados,
  getEstadosById,
  addEstado,
  updateEstado,
  deleteEstado,
};
