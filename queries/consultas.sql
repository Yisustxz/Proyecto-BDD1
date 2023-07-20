-------------------------------------------------------------------------------------
/*Modelos de vehículos que más se atendieron para un período dado o por tipo de
servicio.*/
INSERT INTO modelos (cod_modelo, nombre_modelo, num_asiento, marca, peso, t_aceite, aceite_caja, octanaje, t_refrigerante)
VALUES ('FIUM', 'Fiumba', 4, 'PP', 70, 'AM', 'caja', '98', 'AC'),
('MUIF', 'Bamfiu', 4, 'PP', 70, 'AM', 'box', '93', 'AI'),
('UI', 'User interface', 2, 'JL', 70, 'AM', 'bb', '95', 'AH')

INSERT INTO vehiculos (placa, ano_vehiculo, num_serial, num_motor, color, fecha_venta, concesionario_vendedor, info_importante, cod_modelo, ci_cliente)
VALUES ('w4fv2w8', '2018-05-12', 'cdq44', '21755', 'verde', '2019-05-12', 'Los pansitos', 'Tiene una puerta fuera', 'FIUM', '27596432'),
('w5fv2w8', '2015-05-12', 'cdq11', '21774', 'rojo', '2016-05-12', 'Los pan', 'Medio chocao', 'FIUM', '27596432'),
('w6fv2w8', '2014-05-12', 'cdq22', '21789', 'naranja', '2015-05-12', 'Los pansitos', 'Radio dañada', 'MUIF', '27596432'),
('w7fv2w8', '2016-05-12', 'cdq33', '21744', 'morado', '2017-05-12', 'Los pan', 'Asiento sucio', 'MUIF', '27596432'),
('w8fv2w8', '2018-05-12', 'cdq55', '21734', 'verde', '2019-05-12', 'Los pansitos', 'Rayoncito', 'MUIF', '27596432'),
('w9fv2w8', '2017-05-12', 'cdq66', '21784', 'rojo', '2018-05-12', 'Los pan', 'No prende', 'aa', '27596432'),
('w1fv2w8', '2019-05-12', 'cdq77', '21777', 'azul', '2020-05-12', 'Los papas', 'Si prende', 'UI', '27596432'),
('w0fv2w8', '2011-05-12', 'cdq88', '21745', 'blanco', '2012-05-12', 'Los pap', 'No tiene luces', 'UI', '27596432'),
('w2fv2w8', '2017-05-12', 'cdq99', '21333', 'negro', '2018-05-12', 'Los pap', 'Los desmantelaron', 'UI', '27596432'),
('w3fv2w8', '2014-05-12', 'cdq00', '21556', 'marron', '2015-05-12', 'Los papas', 'Se desarma', 'UI', '27596432')

INSERT INTO actividades (cod_servicio, descripcion_actividad, costo_actividad)
VALUES ('CDR', 'Sacar las ruedas', 10),
('CDR', 'Limpiar los rines', 100),
('CDR', 'Vender las ruedas viejas', 90),
('CDR', 'Poner las ruedas nuevas', 5),
('CDA', 'Quitar el aceite viejo', 15),
('CDA', 'Comprar el aceite nuevo', 40),
('PIN', 'Pintar las puertas', 20),
('PIN', 'Pintar las ventanas', 70),
('PIN', 'Pintar las luces', 20),
('PIN', 'Lavar la pintura', 30)

INSERT INTO ordenes_servicio 
(ci_autorizado, nombre_autorizado, hora_entrada, hora_salida_estimada, hora_salida_real, fecha_entrada, fecha_salida_estimada, fecha_salida_real, placa, ci_trabajador)
VALUES ('', '', '04:45:12', '04:45:12', '04:45:12', '2023-08-07', '2023-08-07', '2023-09-07', 'w5fv2w8', '29643379'),
('', '', '04:45:12', '04:45:12', '04:45:12', '2020-08-07', '2023-08-07', '2020-09-07', 'w5fv2w8', '29643379'),
('', '', '04:45:12', '04:45:12', '04:45:12', '2021-08-07', '2023-08-07', '2021-09-07', 'w5fv2w8', '29643379'),
('', '', '04:45:12', '04:45:12', '04:45:12', '2019-08-07', '2023-08-07', '2019-09-07', 'w8fv2w8', '29643379'),
('', '', '04:45:12', '04:45:12', '04:45:12', '2018-08-07', '2023-08-07', '2018-09-07', 'w8fv2w8', '29643379'),
('', '', '04:45:12', '04:45:12', '04:45:12', '2020-08-07', '2023-08-07', '2020-09-07', 'w8fv2w8', '29643379'),
('', '', '04:45:12', '04:45:12', '04:45:12', '2020-08-07', '2023-08-07', '2020-09-07', 'w8fv2w8', '29643379'),
('', '', '04:45:12', '04:45:12', '04:45:12', '2019-08-07', '2023-08-07', '2019-09-07', 'w3fv2w8', '29643379'),
('', '', '04:45:12', '04:45:12', '04:45:12', '2022-08-07', '2023-08-07', '2022-09-07', 'w2fv2w8', '29643379'),
('', '', '04:45:12', '04:45:12', '04:45:12', '2023-08-07', '2023-08-07', '2023-09-07', 'w0fv2w8', '29643379')

INSERT INTO detalle_servicio 
(num_unico, cantidad, costo)
VALUES (6, 2, 10),
(7, 3, 14),
(8, 4, 8),
(9, 5, 7),
(10, 12, 2),
(11, 21, 4),
(12, 23, 7),
(13, 24, 7),
(14, 27, 5)

INSERT INTO especifica (num_unico, num_detalle, cod_actividad, num_consecutivo)
VALUES (6, 2, 'CDR', 3),
(7, 3, 'CDR', 4),
(8, 4, 'CDR', 5),
(9, 5, 'CDR', 6),
(10, 6, 'CDA', 7),
(11, 7, 'CDA', 8),
(12, 8, 'PIN', 9),
(13, 9, 'PIN', 10),
(14, 10, 'PIN', 11),
(14, 10, 'PIN', 12)

------------------------------------------------------------------------------------
WITH cantAtendidosPeriodo AS (
	SELECT
		m.cod_modelo,
		m.nombre_modelo,
		m.marca,
		COUNT(num_unico) AS veces_atendido
	FROM
		modelos m
		INNER JOIN vehiculos v USING(cod_modelo)
		INNER JOIN ordenes_servicio os USING (placa)
	WHERE
		fecha_entrada BETWEEN '2023-04-10'
		AND '2023-09-10'
	GROUP BY
		m.cod_modelo,
		m.nombre_modelo,
		m.marca
),
cantAtendidosServicio AS (
	SELECT
		m.cod_modelo,
		m.nombre_modelo,
		m.marca,
		a.cod_servicio,
		COUNT(num_unico) AS veces_atendido
	FROM
		modelos m
		INNER JOIN vehiculos v USING(cod_modelo)
		INNER JOIN ordenes_servicio os USING (placa)
		INNER JOIN detalle_servicio ds USING (num_unico)
		INNER JOIN especifica e USING (num_unico)
		INNER JOIN actividades a ON e.cod_actividad = a.cod_servicio
	WHERE a.cod_servicio = 'CDA'
		
	GROUP BY
		m.cod_modelo,
		m.nombre_modelo,
		m.marca,
		a.cod_servicio
),
maxAtendidos AS (
	SELECT
		MAX(veces_atendido) AS maximo_atendido
	FROM
		cantAtendidosServicio
)
SELECT
	cod_modelo,
	nombre_modelo,
	marca,
	cod_servicio,
	veces_atendido
FROM
	cantAtendidosServicio,
	maxAtendidos
WHERE
	veces_atendido = maximo_atendido



------------------------------------------------------------------------
-- Personal que realiza más/menos servicios por mes
SELECT 
  t.ci_trabajador,
  t.nombre_trabajador,
  EXTRACT(MONTH FROM os.fecha_salida_real) AS mes,
  COUNT(os.num_unico) AS cantidad_servicios
FROM
  trabajadores t
LEFT JOIN 
  ordenes_servicio os ON t.ci_trabajador = os.ci_trabajador
WHERE os.fecha_salida_real BETWEEN '2023-01-01' AND '2023-12-31'
GROUP BY 
  t.ci_trabajador, t.nombre_trabajador, mes
ORDER BY 
  mes, cantidad_servicios DESC;


-------------------------------------------------------------------------------------

/* --  Lista ordenada de clientes frecuentes ( por ejemplo dado un rango de fecha, conocer
la cantidad de veces que cada cliente solicitó algún servicio y el monto del servicio ) y
cumplimiento de la política de cliente frecuente. */


SELECT
  c.ci_cliente,
  c.nombre_cliente,
  s.nombre_servicio,
  COUNT(os.num_unico) AS veces_contratado,
  SUM(fs.monto_total) AS monto_acumulado
FROM
  clientes c
LEFT JOIN vehiculos v USING (ci_cliente)
INNER JOIN ordenes_servicio os USING(placa)
INNER JOIN facturas fs USING(num_unico)
INNER JOIN especifica e ON os.num_unico = e.num_unico
RIGHT JOIN servicios s ON e.cod_actividad = s.cod_servicio
INNER JOIN descuentos d USING (porcentaje)
WHERE
  os.fecha_entrada BETWEEN '2023-01-01' AND '2023-12-31' -- Ajusta el rango de fechas según tus necesidades
GROUP BY
  c.ci_cliente,
  c.nombre_cliente,
  s.nombre_servicio,
  d.rango_min
HAVING (COUNT(DISTINCT os.num_unico) >= d.rango_min)
ORDER BY
  veces_contratado DESC,
  monto_acumulado DESC;


-----------------------------------------------------------------------------------
/* Producto(s) con mayor/menos salida por ventas, porcentaje de productos no
ecológicos en el almacén. */

-- hay 2 formas individualmente y todo en conjunto para esto 

-- 1 forma individual 

/* Producto con mayor salida por ventas: */
SELECT
  p.cod_producto,
  p.nombre_producto,
  SUM(d.cantidad) AS total_salida_ventas
FROM
  productos p
JOIN utiliza u ON p.cod_producto = u.cod_producto
JOIN detalle_servicio d ON u.num_unico = d.num_unico AND u.num_detalle = d.num_detalle
GROUP BY
  p.cod_producto,
  p.nombre_producto
ORDER BY
  total_salida_ventas DESC
LIMIT 1;

/* Producto con menor salida por ventas: */

SELECT
  p.cod_producto,
  p.nombre_producto,
  SUM(d.cantidad) AS total_salida_ventas
FROM
  productos p
JOIN utiliza u ON p.cod_producto = u.cod_producto
JOIN detalle_servicio d ON u.num_unico = d.num_unico AND u.num_detalle = d.num_detalle
GROUP BY
  p.cod_producto,
  p.nombre_producto
ORDER BY
  total_salida_ventas
LIMIT 1;


/* Porcentaje de productos no ecológicos en el almacén: */

SELECT
  COUNT(*) AS total_productos,
  SUM(CASE WHEN es_ecologico = FALSE THEN 1 ELSE 0 END) AS productos_no_ecologicos,
  (SUM(CASE WHEN es_ecologico = FALSE THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS porcentaje_no_ecologicos
FROM
  productos;


-- 2 forma terrorista 

WITH ventas_productos AS (
  SELECT
    p.cod_producto,
    p.nombre_producto,
    SUM(d.cantidad) AS total_salida_ventas
  FROM
    productos p
  JOIN utiliza u ON p.cod_producto = u.cod_producto
  JOIN detalle_servicio d ON u.num_unico = d.num_unico AND u.num_detalle = d.num_detalle
  GROUP BY
    p.cod_producto,
    p.nombre_producto
)
SELECT
  MAX(vp.cod_producto) AS producto_max_salida_ventas,
  MAX(vp.nombre_producto) AS nombre_producto_max_salida,
  MAX(vp.total_salida_ventas) AS total_salida_max,
  MIN(vp.cod_producto) AS producto_min_salida_ventas,
  MIN(vp.nombre_producto) AS nombre_producto_min_salida,
  MIN(vp.total_salida_ventas) AS total_salida_min,
  COUNT(*) AS total_productos,
  SUM(CASE WHEN p.es_ecologico = FALSE THEN 1 ELSE 0 END) AS productos_no_ecologicos,
  (SUM(CASE WHEN p.es_ecologico = FALSE THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS porcentaje_no_ecologicos
FROM
  ventas_productos vp
CROSS JOIN productos p;


----------------------------------------------------------------------------------------------

/* Servicio (s) que más/menos se han solicitado
Esta consulta utiliza la tabla "servicios" y la tabla "reserva" para contar cuántas veces se ha solicitado cada servicio. Usamos una función de agregación COUNT para contar el número de reservas asociadas a cada servicio. Luego, ordenamos los resultados en orden descendente según el conteo y utilizamos LIMIT 1 para obtener el servicio más solicitado. Si quieres obtener el servicio menos solicitado, simplemente cambia el orden a ASC y elimina LIMIT 1.

Si deseas obtener todos los servicios con sus conteos, puedes eliminar la cláusula LIMIT 1 de la consulta.
*/


SELECT
  s.cod_servicio,
  s.nombre_servicio,
  COUNT(DISTINCT r.cod_reserva) AS total_reserva,
  COUNT(DISTINCT os.num_unico) AS total_ordenes,
  COUNT(DISTINCT r.cod_reserva) + COUNT(DISTINCT os.num_unico) AS total_solicitudes
FROM
  servicios s
LEFT JOIN reserva r USING (cod_servicio)
INNER JOIN especifica e ON s.cod_servicio = e.cod_actividad
INNER JOIN ordenes_servicio os USING (num_unico)
GROUP BY
  s.cod_servicio,
  s.nombre_servicio
ORDER BY
  total_solicitudes ASC
LIMIT 1

---------------------------------------------------------------------------------------------------------

/* Histórico de uso de servicios por vehículo */

SELECT
  v.placa AS "Placa vehículo",
  s.cod_servicio AS "CodServicio",
  s.nombre_servicio AS "Nombre servicio",
  os.fecha_entrada AS "Fecha entrada",
  os.hora_entrada AS "Hora entrada",
  os.fecha_salida_real AS "Fecha Salida Real",
  os.hora_salida_real AS "Hora salida real"
FROM
  vehiculos v
LEFT JOIN ordenes_servicio os ON v.placa = os.placa
LEFT JOIN servicios s ON os.ci_trabajador = s.ci_trabajador
ORDER BY
  v.placa,
  os.fecha_entrada,
  os.hora_entrada;


-----------------------------------------------------------------------------------------------------

/* Comparación entre las distintas agencias, cual factura más/menos por servicios, en un
lapso de tiempo dado. */

SELECT co.rif AS "Rif Agencia",
  co.nombre AS "Agencia",
  COUNT(DISTINCT f.num_factura) AS "Cantidad de Facturas",
  SUM(f.monto_total) AS "Monto Total Facturado"
FROM
  concesionario co
INNER JOIN posee p USING (rif)
INNER JOIN vehiculos v USING (cod_modelo)
INNER JOIN ordenes_servicio os USING (placa)
INNER JOIN facturas f USING (num_unico)
WHERE
  f.fecha_factura BETWEEN '2023-01-01' AND '2023-12-31'
GROUP BY
  co.rif, co.nombre
ORDER BY
  SUM(f.monto_total) DESC;

-----------------------------------------------------------------------------------------------------

/*  Clientes que hacen reservas y después no usan el servicio. */


-- discutir porque esta muy sus 
SELECT
  c.ci_cliente AS "Cédula Cliente",
  c.nombre_cliente AS "Nombre Cliente",
  v.placa AS "Placa Vehículo",
  r.cod_reserva AS "Código Reserva",
  r.fecha_reservada AS "Fecha Reserva"
FROM
  clientes c
INNER JOIN vehiculos v ON c.ci_cliente = v.ci_cliente
INNER JOIN reserva r ON v.placa = r.placa
WHERE r.fecha_reservada < CURRENT_DATE AND
r.asistio = false;

-----------------------------------------------------------------------------------------------------

/*  Generación de factura por cliente con todo su detalle */


SELECT
  f.num_factura AS "Número de Factura",
  c.ci_cliente AS "Cédula Cliente",
  c.nombre_cliente AS "Nombre Cliente",
  v.placa AS "Placa Vehículo",
  os.fecha_entrada AS "Fecha Entrada",
  os.fecha_salida_real AS "Fecha Salida Real",
  f.costo_mano_obra AS "Costo Mano de Obra",
  f.monto_total AS "Monto Total",
  p.cod_producto AS "Código Producto",
  p.nombre_producto AS "Nombre Producto",
  p.precio AS "Precio Unitario",
  us.cantidad_usada AS "Cantidad Utilizada",
  us.cantidad_usada * p.precio AS "Subtotal Producto"
FROM
  facturas f
INNER JOIN ordenes_servicio os ON f.num_unico = os.num_unico
INNER JOIN vehiculos v ON os.placa = v.placa
INNER JOIN clientes c ON v.ci_cliente = c.ci_cliente
LEFT JOIN detalle_servicio ds ON os.num_unico = ds.num_unico
LEFT JOIN utiliza us ON ds.num_unico = us.num_unico AND ds.num_detalle = us.num_detalle
LEFT JOIN productos p ON us.cod_producto = p.cod_producto
WHERE
  c.ci_cliente = '27596432';


--------------------------------------------------------------------------------------------------

-- Programa de mantenimiento por modelo de vehículo

-- esta algo sus y hay que discutirlo 
SELECT
  m.cod_modelo AS "Cod_mod",
  m.nombre_modelo AS "Nombre Modelo",
  s.nombre_servicio AS "Nombre_Servicio",
  sr.kilometraje AS "Kilometraje",
  sr.tiempo_uso AS "Tiempo de uso"
FROM
  modelos m
INNER JOIN se_le_recomiendan sr ON m.cod_modelo = sr.cod_modelo
INNER JOIN servicios s ON sr.cod_servicio = s.cod_servicio
WHERE m.cod_modelo = 'aa'
ORDER BY m.cod_modelo, s.cod_servicio;
