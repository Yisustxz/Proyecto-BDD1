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

const getEspecifica = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query;

    let offset = (Number(page) - 1) * Number(size);

    if (Number(page) < 1) {
      offset = 0;
    }

    const isEmpty = await pool.query("SELECT * FROM especifica");
    if (isEmpty.rowCount === 0) {
      throw new Error("La tabla está vacía", STATUS_NOT_FOUND);
    }
    const response = await pool.query({
      text: "SELECT * FROM especifica ORDER BY num_unico, num_detalle, cod_actividad, num_consecutivo",
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

const getEspecificaById = async (req, res) => {
  try {
    const response = await pool.query({
      text: "SELECT * FROM especifica WHERE num_unico = $1 AND num_detalle = $2 AND cod_actividad = $3 AND num_consecutivo = $4",
      values: [
        req.params.unic,
        req.params.detail,
        req.params.cod,
        req.params.num,
      ],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar especifica con num_unico: ${req.params.unic}, num_detalle: ${req.params.detail}, cod_actividad ${req.params.cod} y num_consecutivo: ${req.params.num}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getEspecificaFromRequestBody = (requestBody) => {
  const { num_unico, num_detalle, cod_actividad, num_consecutivo } =
    requestBody;

  const newEspecifica = [
    num_unico,
    num_detalle,
    cod_actividad,
    num_consecutivo,
  ];

  return newEspecifica;
};

const addEspecifica = async (req, res) => {
  try {
    const newEspecifica = getEspecificaFromRequestBody(req.body);

    const insertar = await pool.query({
      text: "INSERT INTO especifica (num_unico, num_detalle, cod_actividad, num_consecutivo) VALUES ($1, $2, $3, $4) RETURNING num_unico, num_detalle, cod_actividad, num_consecutivo",
      values: newEspecifica,
    });
    const insertedUnic = insertar.rows[0].num_unico;
    const insertedDetail = insertar.rows[0].num_detalle;
    const insertedCod = insertar.rows[0].cod_actividad;
    const insertedNum = insertar.rows[0].num_consecutivo;
    const response = await pool.query({
      text: "SELECT * FROM especifica WHERE num_unico = $1 AND num_detalle = $2 AND cod_actividad = $3 AND num_consecutivo = $4",
      values: [insertedUnic, insertedDetail, insertedCod, insertedNum],
    });
    return successItemsResponse(res, STATUS_CREATED, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const deleteEspecifica = async (req, res) => {
  try {
    const response = await pool.query({
      text: "DELETE FROM especifica WHERE num_unico = $1 AND num_detalle = $2 AND cod_actividad = $3 AND num_consecutivo = $4",
      values: [
        req.params.unic,
        req.params.detail,
        req.params.cod,
        req.params.num,
      ],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar especifica con num_unico: ${req.params.unic}, num_detalle: ${req.params.detail}, cod_actividad ${req.params.cod} y num_consecutivo: ${req.params.num}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Especifica ha sido eliminado");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getEspecifica,
  getEspecificaById,
  addEspecifica,
  deleteEspecifica,
};
