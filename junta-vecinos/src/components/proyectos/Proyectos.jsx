import React from 'react';
import { useState, useEffect } from "react";
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { ListadoProyectos } from './ListadoProyectos';
// aqui se veran todas las noticias en general
export const Proyectos = () => {

    const [proyectos, setProyectos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        conseguirProyectos();
    }, [])

    const conseguirProyectos = async () => {

        const { datos, cargando } = await Peticion(Global.url + "proyecto/proyectos", "GET");

        if (datos.status === "success") {
            setProyectos(datos.proyectos);
        }

        setCargando(false)
    }

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Proyectos y Actividades</h1>
                <button className="content__button">Mostrar nuevas</button>
            </header>
            {cargando ? "Cargando..." :
                proyectos.length >= 1 ? 
                        <ListadoProyectos proyectos={proyectos} setProyectos={setProyectos}/>
                        : <h1>No hay proyectos</h1>
            }

        </>
    )
}
