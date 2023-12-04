import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import useAuth from '../../hooks/useAuth';

export const Actividad = () => {
    const { auth } = useAuth();
    const [actividad, setActividad] = useState({});
    const [cargando, setCargando] = useState(true);
    const params = useParams();

    useEffect(() => {
        conseguirActividad();
    }, []);

    const conseguirActividad = async () => {
        const { datos } = await Peticion(Global.url + "actividad/actividad/" + params.id, "GET");
        if (datos.status === "success") {
            setActividad(datos.actividad);
        }
        setCargando(false);
    };

    const aprobarActividad = async () => {
        try {
            // Realizar solicitud para aprobar la actividad al backend
            const { datos } = await Peticion(Global.url + "actividad/aprobar/" + params.id, "PUT");

            if (datos.status === "success") {
                console.log('Actividad aprobada con éxito');
                // Recargar la actividad después de la aprobación para reflejar los cambios
                await conseguirActividad();
            } else {
                // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
                console.error('Error al aprobar la actividad:', datos.message);
            }
        } catch (error) {
            console.error('Error al aprobar la actividad:', error);
            res.status(500).json({ status: 'error', message: 'Error al aprobar la actividad' });
        }
    };

    return (
        <div className='jumbo'>
            {cargando ? "Cargando..." :
                <>
                    <h1>{actividad.nombre}</h1>
                    <p>Fecha: {new Date(actividad.fecha).toLocaleDateString()}</p>
                    <p>Hora: {actividad.hora}</p>
                    <p>Lugar: {actividad.lugar}</p>
                    <p>Cupo: {actividad.cupo}</p>

                    {/* Botón para aprobar la actividad */}
                    {auth.email === 'admin@gmail.com' && actividad.estado === 'pendiente' && (
                        <button className="approve" onClick={aprobarActividad}>
                            Aprobar
                        </button>
                    )}

                    {/* Aquí puedes agregar el botón y la lógica para eliminar la actividad si es necesario */}
                </>
            }
        </div>
    );
};
