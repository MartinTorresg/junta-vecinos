import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';

export const ActividadIndividual = () => {

    const [actividad, setActividad] = useState({});
    const [cargando, setCargando] = useState(true);
    const params = useParams();

    useEffect(() => {
        conseguirActividad();
    }, []);

    const conseguirActividad = async () => {
        const { datos, cargando } = await Peticion(Global.url + "actividad/actividad/" + params.id, "GET");

        if (datos.status === "success") {
            setActividad(datos.actividad);
        }

        setCargando(false);
    }

    return (
        <div className='jumbo'>
            {cargando ? "Cargando..." :
                <>
                    <h1>{actividad.nombre}</h1>
                    <span>Fecha: {new Date(actividad.fecha).toLocaleDateString()}</span>
                    <span>Hora: {actividad.hora}</span>
                    <span>Lugar: {actividad.lugar}</span>
                    <span>Cupo: {actividad.cupo}</span>
                </>
            }
        </div>
    );
};
