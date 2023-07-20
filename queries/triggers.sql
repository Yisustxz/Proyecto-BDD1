CREATE OR REPLACE FUNCTION update_total_cost()
RETURNS TRIGGER AS $$
DECLARE
    ci_cliente VARCHAR(8);
    porcentaje_descuento INTEGER;
    veces_contratado INTEGER;
	costo_de_actividad NUMERIC;
BEGIN
	SELECT
  		c.ci_cliente,
		d.porcentaje AS porcentaje_descuento,
  		COUNT(os.num_unico) AS veces_contratado
	FROM
  		clientes c
		LEFT JOIN vehiculos v USING (ci_cliente)
		INNER JOIN ordenes_servicio os USING(placa)
		RIGHT JOIN servicios s ON NEW.cod_actividad = s.cod_servicio
		INNER JOIN descuentos d USING (porcentaje)
		WHERE os.num_unico = NEW.num_unico
	GROUP BY
  		c.ci_cliente,
  		d.porcentaje
	ORDER BY
  		veces_contratado DESC
	INTO
		ci_cliente,
		porcentaje_descuento,
		veces_contratado;
		
	SELECT
  		costo_actividad
	FROM
  		actividades
	WHERE cod_servicio = NEW.cod_actividad AND num_consecutivo = NEW.num_consecutivo
	INTO
		costo_de_actividad;
		
	IF veces_contratado >= (SELECT rango_min
						  FROM descuentos INNER JOIN servicios USING(porcentaje)
						  WHERE cod_servicio = NEW.cod_actividad) THEN
			
	UPDATE detalle_servicio
    SET costo = costo + costo_de_actividad - (costo_de_actividad * porcentaje / 100)
    WHERE num_unico = NEW.num_unico;
    RETURN NEW;
			
	END IF;
		
    UPDATE detalle_servicio
    SET costo = costo + costo_de_actividad
    WHERE num_unico = NEW.num_unico;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_detalle
AFTER INSERT
ON especifica
FOR EACH ROW
EXECUTE FUNCTION update_total_cost();

-----------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION update_total_cost_delete()
RETURNS TRIGGER AS $$
DECLARE
    ci_cliente VARCHAR(8);
    porcentaje_descuento INTEGER;
    veces_contratado INTEGER;
	costo_de_actividad NUMERIC;
BEGIN
	SELECT
  		c.ci_cliente,
		d.porcentaje AS porcentaje_descuento,
  		COUNT(os.num_unico) AS veces_contratado
	FROM
  		clientes c
		LEFT JOIN vehiculos v USING (ci_cliente)
		INNER JOIN ordenes_servicio os USING(placa)
		RIGHT JOIN servicios s ON OLD.cod_actividad = s.cod_servicio
		INNER JOIN descuentos d USING (porcentaje)
		WHERE os.num_unico = OLD.num_unico
	GROUP BY
  		c.ci_cliente,
  		d.porcentaje
	ORDER BY
  		veces_contratado DESC
	INTO
		ci_cliente,
		porcentaje_descuento,
		veces_contratado;
		
	SELECT
  		costo_actividad
	FROM
  		actividades
	WHERE cod_servicio = OLD.cod_actividad AND num_consecutivo = OLD.num_consecutivo
	INTO
		costo_de_actividad;
		
	IF veces_contratado >= (SELECT rango_min
						  FROM descuentos INNER JOIN servicios USING(porcentaje)
						  WHERE cod_servicio = OLD.cod_actividad) THEN
			
	UPDATE detalle_servicio
    SET costo = costo - costo_de_actividad + (costo_de_actividad * porcentaje / 100)
    WHERE num_unico = OLD.num_unico;
    RETURN NEW;
			
	END IF;
		
    UPDATE detalle_servicio
    SET costo = costo - costo_de_actividad
    WHERE num_unico = OLD.num_unico;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_detalle_delete
AFTER DELETE
ON especifica
FOR EACH ROW
EXECUTE FUNCTION update_total_cost_delete();

--------------------------------------------------------------------------------


