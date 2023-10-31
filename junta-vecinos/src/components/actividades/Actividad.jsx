import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import useAuth from '../../hooks/useAuth';

export const Actividad = () => {

    const { auth, loading } = useAuth();
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

    const aprobarActividad = async () => {
        try {
            // Realizar solicitud para aprobar la actividad al backend
            
            const response = await Peticion(Global.url + "actividad/aprobar/" + params.id, {
                method: 'PUT', // Método HTTP para actualizar la actividad aprobada
                headers: {
                    'Content-Type': 'application/json',
                    // Puedes incluir headers de autorización si es necesario
                    // 'Authorization': `Bearer ${token}`
                },
            });
    
            if (response.ok) {
                // La actividad fue aprobada exitosamente, puedes manejar la respuesta si es necesario
                console.log('Actividad aprobada con éxito');
                // Recargar la actividad después de la aprobación para reflejar los cambios
                await conseguirActividad();
            } else {
                // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
                console.error('Error al aprobar la actividad:', response.statusText);
            }
        } catch (error) {
            // Manejar errores de red u otros errores inesperados
            console.error('Error al aprobar la actividad:', error);
        }
    };
    
    const eliminarActividad = async () => {
        try {
            // Realizar solicitud para eliminar la actividad al backend
            const response = await fetch(Global.url + "actividad/aprobar/" + params.id, {
                method: 'DELETE', // Método HTTP para eliminar la actividad
                headers: {
                    // Puedes incluir headers de autorización si es necesario
                    // 'Authorization': `Bearer ${token}`
                },
            });
    
            if (response.ok) {
                // La actividad fue eliminada exitosamente, puedes manejar la respuesta si es necesario
                console.log('Actividad eliminada con éxito');
                // Redirigir a la página principal después de eliminar la actividad
                window.location.href = '/'; // Puedes usar React Router para redirigir de forma programática
            } else {
                // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
                console.error('Error al eliminar la actividad:', response.statusText);
            }
        } catch (error) {
            // Manejar errores de red u otros errores inesperados
            console.error('Error al eliminar la actividad:', error);
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
                    {auth.email === 'admin@gmail.com' && (
                        <button className="approve" onClick={aprobarActividad}>
                            Aprobar
                        </button>
                    )}

                    {/* Botón para eliminar la actividad */}
                    {auth.email === 'admin@gmail.com' && (
                        <button className="delete" onClick={eliminarActividad}>
                            Borrar
                        </button>
                    )}
                </>
            }
        </div>
    );
};