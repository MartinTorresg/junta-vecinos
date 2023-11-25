import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { ListadoProyectos } from './ListadoProyectos';
// aqui se veran todas las noticias en general
/* aca hay que cambiar hartas cosas relacionada a las noticias, que incluya una foto y los estilos css */
export const Proyecto = () => {

    const [proyecto, setProyecto] = useState({});
    const [cargando, setCargando] = useState(true);
    const params = useParams();

    useEffect(() => {
        conseguirProyecto();
    }, [])

    const conseguirProyecto = async () => {

        const { datos, cargando } = await Peticion(Global.url + "proyecto/proyecto/" + params.id, "GET");

        if (datos.status === "success") {
            setProyecto(datos.proyecto);
        }

        setCargando(false)
    }

    const cambiarEstado = async (nuevoEstado) => {
        // Lógica para enviar la actualización al backend
        const { datos } = await Peticion(Global.url + "proyecto/actualizar_estado/" + proyecto._id, "PUT", { estado: nuevoEstado });
        if (datos.status === "success") {
            setProyecto({ ...proyecto, estado: nuevoEstado });
        }
    }

    return (
        <div className='jumbo'>
            {cargando ? "Cargando..." :
                <>
                    <h1>{proyecto.nombre}</h1>
                    <p>{proyecto.descripcion}</p>
                    <p>Estado actual: {proyecto.estado}</p>
                    <select value={proyecto.estado} onChange={(e) => cambiarEstado(e.target.value)}>
                        <option value="Por Revisar">Por Revisar</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Finalizado">Finalizado</option>
                    </select>
                </>
            }
        </div>
    );
};