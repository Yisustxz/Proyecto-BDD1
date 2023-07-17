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