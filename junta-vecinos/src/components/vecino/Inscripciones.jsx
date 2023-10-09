import React, { useState, useEffect } from "react";
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { ListadoInscripciones } from './ListadoInscripciones';

export const Inscripciones = () => {
    const [inscripciones, setInscripciones] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        conseguirInscripciones();
    }, []);

    const conseguirInscripciones = async () => {
        try {
            // Establece el estado de carga a true antes de hacer la solicitud.
            setCargando(true);

            const { datos, cargando } = await Peticion(Global.url + "inscripcion/inscripciones", "GET");

            if (datos.status === "success") {
                setInscripciones(datos.inscripciones);
            }

            // Establece el estado de carga a false después de recibir la respuesta.
            setCargando(false);
        } catch (error) {
            console.error("Error al obtener inscripciones:", error);
            // Puedes manejar el error de acuerdo a tus necesidades.
        }
    }

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Inscripciones</h1>
                <button className="content__button">Mostrar nuevas</button>
            </header>
            {cargando ? "Cargando..." :
                inscripciones.length >= 1 ?
                    <ListadoInscripciones inscripciones={inscripciones} setInscripciones={setInscripciones} />
                    : <h1>No hay inscripciones</h1>
            }
        </>
    )
}
