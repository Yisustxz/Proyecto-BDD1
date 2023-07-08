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

const getSeEspecializa = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query;

    let offset = (Number(page) - 1) * Number(size);

    if (Number(page) < 1) {
      offset = 0;
    }

    const isEmpty = await pool.query("SELECT * FROM se_especializa");
    if (isEmpty.rowCount === 0) {
      throw new Error("La tabla está vacía", STATUS_NOT_FOUND);
    }
    const response = await pool.query({
      text: "SELECT * FROM se_especializa ORDER BY ci_trabajador, cod_servicio",
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

const getSeEspecializaById = async (req, res) => {
  try {
    const response = await pool.query({
      text: "SELECT * FROM se_especializa WHERE ci_trabajador = $1 AND cod_servicio = $2",
      values: [req.params.id, req.params.cod],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la especialización del trabajador de cédula ${req.params.id} en el servicio ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getSeEspecializaFromRequestBody = (requestBody) => {
  const { ci_trabajador, cod_servicio } = requestBody;

  const newSeEspecializa = [ci_trabajador, cod_servicio];

  return newSeEspecializa;
};

const addSeEspecializa = async (req, res) => {
  try {
    const newSeEspecializa = getSeEspecializaFromRequestBody(req.body);

    const insertar = await pool.query({
      text: "INSERT INTO se_especializa (ci_trabajador, cod_servicio) VALUES ($1, $2) RETURNING ci_trabajador, cod_servicio",
      values: newSeEspecializa,
    });
    const insertedId = insertar.rows[0].ci_trabajador;
    const insertedCod = insertar.rows[0].cod_servicio;
    const response = await pool.query({
      text: "SELECT * FROM se_especializa WHERE ci_trabajador = $1 AND cod_servicio = $2",
      values: [insertedId, insertedCod],
    });
    return successItemsResponse(res, STATUS_CREATED, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const deleteSeEspecializa = async (req, res) => {
  try {
    const response = await pool.query({
      text: "DELETE FROM se_especializa WHERE ci_trabajador = $1 AND cod_servicio = $2",
      values: [req.params.id, req.params.cod],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar al trabajador de cedula ${req.params.id} especializado en el servicio ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Especializacion ha sido eliminado");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getSeEspecializa,
  getSeEspecializaById,
  addSeEspecializa,
  deleteSeEspecializa,
};
