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

const getSeLeHacen = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query;

    let offset = (Number(page) - 1) * Number(size);

    if (Number(page) < 1) {
      offset = 0;
    }

    const isEmpty = await pool.query("SELECT * FROM se_le_hacen");
    if (isEmpty.rowCount === 0) {
      throw new Error("La tabla está vacía", STATUS_NOT_FOUND);
    }
    const response = await pool.query({
      text: "SELECT * FROM se_le_hacen ORDER BY placa, cod_servicio, num_consecutivo",
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

const getSeLeHacenById = async (req, res) => {
  try {
    const response = await pool.query({
      text: "SELECT * FROM se_le_hacen WHERE placa = $1 AND cod_servicio = $2 AND num_consecutivo = $3",
      values: [req.params.placa, req.params.cod, req.params.num],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la actividad de codigo ${req.params.cod} y numero ${req.params.num} hecha al vehiculo de placa ${req.params.placa}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getSeLeHacenFromRequestBody = (requestBody) => {
  const { placa, cod_servicio, num_consecutivo } = requestBody;

  const newSeLeHacen = [placa, cod_servicio, num_consecutivo];

  return newSeLeHacen;
};

const addSeLeHacen = async (req, res) => {
  try {
    const newSeLeHacen = getSeLeHacenFromRequestBody(req.body);

    const insertar = await pool.query({
      text: "INSERT INTO se_le_hacen (placa, cod_servicio, num_consecutivo) VALUES ($1, $2, $3) RETURNING placa, cod_servicio, num_consecutivo",
      values: newSeLeHacen,
    });
    const insertedPlaca = insertar.rows[0].placa;
    const insertedCod = insertar.rows[0].cod_servicio;
    const insertedNum = insertar.rows[0].num_consecutivo;
    const response = await pool.query({
      text: "SELECT * FROM se_le_hacen WHERE placa = $1 AND cod_servicio = $2 AND num_consecutivo = $3",
      values: [insertedPlaca, insertedCod, insertedNum],
    });
    return successItemsResponse(res, STATUS_CREATED, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const deleteSeLeHacen = async (req, res) => {
  try {
    const response = await pool.query({
      text: "DELETE FROM se_le_hacen WHERE placa = $1 AND cod_servicio = $2 AND num_consecutivo = $3",
      values: [req.params.placa, req.params.cod, req.params.num],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la actividad de codigo ${req.params.cod} y numero ${req.params.num} hecha al vehiculo de placa ${req.params.placa}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Servicio hecho ha sido eliminado");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getSeLeHacen,
  getSeLeHacenById,
  addSeLeHacen,
  deleteSeLeHacen,
};
