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

const getConcesionarios = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query;

    let offset = (Number(page) - 1) * Number(size);

    if (Number(page) < 1) {
      offset = 0;
    }

    const isEmpty = await pool.query("SELECT * FROM concesionario");
    if (isEmpty.rowCount === 0) {
      throw new Error("La tabla está vacía", STATUS_NOT_FOUND);
    }
    const response = await pool.query({
      text: "SELECT * FROM concesionario ORDER BY rif",
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

const getConcesionarioById = async (req, res) => {
  try {
    const response = await pool.query({
      text: "SELECT * FROM concesionario WHERE rif = $1",
      values: [req.params.rif],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el concesionario de rif: ${req.params.rif}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getConcesionarioFromRequestBody = (requestBody) => {
  const { rif, nombre, cod_est, num_consecutivo, ci_encargado } = requestBody;

  const newConcesionario = [
    rif,
    nombre,
    cod_est,
    num_consecutivo,
    ci_encargado,
  ];

  return newConcesionario;
};

const addConcesionario = async (req, res) => {
  try {
    const newConcesionario = getConcesionarioFromRequestBody(req.body);

    const insertar = await pool.query({
      text: "INSERT INTO concesionario (rif, nombre, cod_est, num_consecutivo, ci_encargado) VALUES ($1, $2, $3, $4, $5) RETURNING rif",
      values: newConcesionario,
    });
    const insertedRif = insertar.rows[0].rif;
    const response = await pool.query({
      text: "SELECT * FROM concesionario WHERE rif = $1",
      values: [insertedRif],
    });
    return successItemsResponse(res, STATUS_CREATED, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getConcesionarioFromRequestBodyU = (requestBody) => {
  const { nombre, cod_est, num_consecutivo, ci_encargado } = requestBody;

  const newConcesionario = [nombre, cod_est, num_consecutivo, ci_encargado];

  return newConcesionario;
};

const updateConcesionario = async (req, res) => {
  try {
    const updatedConcesionario = getConcesionarioFromRequestBodyU(req.body);
    updatedConcesionario.push(req.params.rif);
    const response = await pool.query({
      text: "UPDATE concesionario SET nombre = $1, cod_est = $2, num_consecutivo = $3, ci_encargado = $4 WHERE rif = $5",
      values: updatedConcesionario,
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el concesionario de rif: ${req.params.rif}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(
      res,
      STATUS_OK,
      "Concesionario modificado exitosamente"
    );
  } catch (error) {
    res.send(error.message);
  }
};

const deleteConcesionario = async (req, res) => {
  try {
    const response = await pool.query({
      text: "DELETE FROM concesionario WHERE rif = $1",
      values: [req.params.rif],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el concesionario de rif: ${req.params.rif}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Concesionario ha sido eliminado");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getConcesionarios,
  getConcesionarioById,
  addConcesionario,
  updateConcesionario,
  deleteConcesionario,
};
