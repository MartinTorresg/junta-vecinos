import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Register } from '../user/Register';

export const Inscripcion = () => {
    const [inscripcion, setInscripcion] = useState({});
    const [cargando, setCargando] = useState(true);
    const params = useParams();

    useEffect(() => {
        conseguirInscripcion();
    }, []);

    const conseguirInscripcion = async () => {
        const { datos } = await Peticion(Global.url + "inscripcion/inscripcion/" + params.id, "GET");

        if (datos.status === "success") {
            setInscripcion(datos.inscripcion);
        }

        setCargando(false);
    };

    return (
        <div className='jumbo'>
            {cargando ? "Cargando..." :
                <>
                    <h1>{inscripcion.nombre}</h1>
                    <p>{inscripcion.apellido}</p>
                    <p>{inscripcion.run}</p>
                    <p>{inscripcion.email}</p>
                    <p>{inscripcion.fecha_nacimiento}</p>
                    <p>{inscripcion.direccion}</p>
                    <p><strong>Región: </strong>{inscripcion.region?.nombre || 'No especificado'}</p>
                    <p><strong>Comuna: </strong>{inscripcion.comuna?.nombre || 'No especificado'}</p>
                </>
            }
            <Register />
        </div>
    );
};
