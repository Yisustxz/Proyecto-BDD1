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

const getCiudades = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query;

    let offset = (Number(page) - 1) * Number(size);

    if (Number(page) < 1) {
      offset = 0;
    }

    const isEmpty = await pool.query("SELECT * FROM ciudades");
    if (isEmpty.rowCount === 0) {
      throw new Error("La tabla está vacía", STATUS_NOT_FOUND);
    }
    const response = await pool.query({
      text: "SELECT * FROM ciudades ORDER BY cod_est, num_consecutivo",
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

const getCiudadesById = async (req, res) => {
  try {
    const response = await pool.query({
      text: "SELECT * FROM ciudades WHERE cod_est = $1 AND num_consecutivo = $2",
      values: [req.params.cod, req.params.num],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la ciudad de codigo de estado: ${req.params.cod}
          y numero consecutivo: ${req.params.num}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getCiudadesFromRequestBody = (requestBody) => {
  const { cod_est, nombre_ciudad } = requestBody;

  const newCiudad = [cod_est, nombre_ciudad];

  return newCiudad;
};

const addCiudad = async (req, res) => {
  try {
    const newCiudad = getCiudadesFromRequestBody(req.body);

    const insertar = await pool.query({
      text: "INSERT INTO ciudades (cod_est, nombre_ciudad) VALUES ($1, $2) RETURNING cod_est, num_consecutivo",
      values: newCiudad,
    });
    const insertedCod = insertar.rows[0].cod_est;
    const insertedNum = insertar.rows[0].num_consecutivo;
    const response = await pool.query({
      text: "SELECT * FROM ciudades WHERE cod_est = $1 AND num_consecutivo = $2",
      values: [insertedCod, insertedNum],
    });
    return successItemsResponse(res, STATUS_CREATED, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getCiudadesFromRequestBodyU = (requestBody) => {
  const { nombre_ciudad } = requestBody;

  const newCiudad = [nombre_ciudad];

  return newCiudad;
};

const updateCiudad = async (req, res) => {
  try {
    const updatedCiudad = getCiudadesFromRequestBodyU(req.body);
    updatedCiudad.push(req.params.cod);
    updatedCiudad.push(req.params.num);
    const response = await pool.query({
      text: "UPDATE ciudades SET nombre_ciudad = $1 WHERE cod_est = $2 AND num_consecutivo = $3",
      values: updatedCiudad,
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la ciudad de codigo de estado: ${req.params.cod}
           y numero consecutivo: ${req.params.num}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Ciudad modificada exitosamente");
  } catch (error) {
    res.send(error.message);
  }
};

const deleteCiudad = async (req, res) => {
  try {
    const response = await pool.query({
      text: "DELETE FROM ciudades WHERE cod_est = $1 AND num_consecutivo = $2",
      values: [req.params.cod, req.params.num],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la Ciudad de codigo de estado: ${req.params.cod}
           y numero consecutivo: ${req.params.num}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Ciudad ha sido eliminada");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getCiudades,
  getCiudadesById,
  addCiudad,
  updateCiudad,
  deleteCiudad,
};
