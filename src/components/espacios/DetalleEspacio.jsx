import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';

export const DetalleEspacio = () => {
    const [espacio, setEspacio] = useState(null);
    const [cargando, setCargando] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const obtenerEspacio = async () => {
            try {
                const response = await fetch(Global.url + `espacio/espacios/detalle/` + id);
                const data = await response.json();
                if (data) { // Asegúrate de que esto coincide con cómo tu backend estructura la respuesta
                    setEspacio(data);
                    setCargando(false);
                } else {
                    throw new Error('La respuesta del backend no tiene la estructura esperada.');
                }
            } catch (error) {
                console.error("Error al obtener detalles:", error);
                setCargando(false);
            }
        };
    
        obtenerEspacio();
    }, [id]);
    

    if (cargando) return <div>Cargando detalles del espacio...</div>;
    if (!espacio) return <div>No se encontró el espacio solicitado.</div>;

    // Función para manejar la lógica de reserva (esto es solo un marcador de posición)
    const reservarEspacio = () => {
        // Aquí deberás implementar la lógica de reserva
        console.log('Reserva del espacio:', espacio);
        // Por ejemplo, mostrar un formulario de reserva o redirigir a la página de reserva
    };

    return (
        <div className='jumbo'>
            <h2>{espacio.nombre}</h2>
            <p>{espacio.descripcion}</p>
            <p>Costo por hora: ${espacio.costoPorHora}</p>
            {/* Más detalles del espacio */}
            <button onClick={reservarEspacio} className='btn btn-primary'>Reservar</button>
        </div>
    );
};
