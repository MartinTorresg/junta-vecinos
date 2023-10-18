import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { ListadoInscripciones } from './ListadoInscripciones';
import { Register } from '../user/Register';
// aqui se veran todas las noticias en general
/* aca hay que cambiar hartas cosas relacionada a las noticias, que incluya una foto y los estilos css */
export const Inscripcion = () => {

    const [inscripcion, setInscripcion] = useState({});
    const [cargando, setCargando] = useState(true);
    const params = useParams();

    useEffect(() => {
        conseguirInscripcion();
    }, [])

    const conseguirInscripcion = async () => {

        const { datos, cargando } = await Peticion(Global.url + "inscripcion/inscripcion/" + params.id, "GET");

        if (datos.status === "success") {
            setInscripcion(datos.inscripcion);
        }

        setCargando(false)
    }

    return (
        <div className='jumbo'>
            {cargando ? "Cargando..." :
                <>
                    <h1>{inscripcion.nombre}</h1>
                    <p>{inscripcion.apellidos}</p>
                    <p>{inscripcion.run}</p>
                    <p>{inscripcion.email}</p>
                    <p>{inscripcion.fecha_nacimiento}</p>
                    <p>{inscripcion.direccion}</p>
                </>

            }
            <Register />

        </div>
    )
}