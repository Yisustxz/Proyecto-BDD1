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

const getSeLeRecomiendan = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query;

    let offset = (Number(page) - 1) * Number(size);

    if (Number(page) < 1) {
      offset = 0;
    }

    const isEmpty = await pool.query("SELECT * FROM se_le_recomiendan");
    if (isEmpty.rowCount === 0) {
      throw new Error("La tabla está vacía", STATUS_NOT_FOUND);
    }
    const response = await pool.query({
      text: "SELECT * FROM se_le_recomiendan ORDER BY cod_modelo, cod_servicio, kilometraje, tiempo_uso",
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

const getSeLeRecomiendanById = async (req, res) => {
  try {
    const response = await pool.query({
      text: "SELECT * FROM se_le_recomiendan WHERE cod_modelo = $1 AND cod_servicio = $2 AND kilometraje = $3 AND tiempo_uso = $4",
      values: [req.params.mod, req.params.cod, req.params.kil, req.params.time],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el servicio ${req.params.cod} recomendado para el modelo ${req.params.mod} con kilometraje ${req.params.kil} y tiempo de uso ${req.params.time}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getSeLeRecomiendanFromRequestBody = (requestBody) => {
  const { cod_modelo, cod_servicio, kilometraje, tiempo_uso } = requestBody;

  const newSeLeRecomiendan = [
    cod_modelo,
    cod_servicio,
    kilometraje,
    tiempo_uso,
  ];

  return newSeLeRecomiendan;
};

const addSeLeRecomiendan = async (req, res) => {
  try {
    const newSeLeRecomiendan = getSeLeRecomiendanFromRequestBody(req.body);

    const insertar = await pool.query({
      text: "INSERT INTO se_le_recomiendan (cod_modelo, cod_servicio, kilometraje, tiempo_uso) VALUES ($1, $2, $3, $4) RETURNING cod_modelo, cod_servicio, kilometraje, tiempo_uso",
      values: newSeLeRecomiendan,
    });
    const insertedMod = insertar.rows[0].cod_modelo;
    const insertedCod = insertar.rows[0].cod_servicio;
    const insertedKil = insertar.rows[0].kilometraje;
    const insertedTime = insertar.rows[0].tiempo_uso;
    const response = await pool.query({
      text: "SELECT * FROM se_le_recomiendan WHERE cod_modelo = $1 AND cod_servicio = $2 AND kilometraje = $3 AND tiempo_uso = $4",
      values: [insertedMod, insertedCod, insertedKil, insertedTime],
    });
    return successItemsResponse(res, STATUS_CREATED, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const deleteSeLeRecomiendan = async (req, res) => {
  try {
    const response = await pool.query({
      text: "DELETE FROM se_le_recomiendan WHERE cod_modelo = $1 AND cod_servicio = $2 AND kilometraje = $3 AND tiempo_uso = $4",
      values: [req.params.mod, req.params.cod, req.params.kil, req.params.time],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el servicio ${req.params.cod} recomendado para el modelo ${req.params.mod} con kilometraje ${req.params.kil} y tiempo de uso ${req.params.time}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(
      res,
      STATUS_OK,
      "Servicio recomendado ha sido eliminado"
    );
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getSeLeRecomiendan,
  getSeLeRecomiendanById,
  addSeLeRecomiendan,
  deleteSeLeRecomiendan,
};
