import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import useAuth from '../../hooks/useAuth';
import { FormularioReserva } from '../reservas/FormularioReserva';


export const DetalleEspacio = () => {
    const [espacio, setEspacio] = useState(null);
    const [cargando, setCargando] = useState(true);
    const { id } = useParams();
    const {auth} = useAuth();

    console.log(auth._id);

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

    if (!espacio) return <div>No se encontró el espacio solicitado.</div>;

    const renderHorariosDisponibles = () => {
        if (!espacio.horariosDisponibles || espacio.horariosDisponibles.length === 0) {
            return <p>No hay horarios disponibles para este espacio.</p>;
        }
    
        // Asumiendo que los horarios están ordenados
        const primerHorario = espacio.horariosDisponibles[0].inicio;
        const ultimoHorario = espacio.horariosDisponibles[espacio.horariosDisponibles.length - 1].fin;
    
        return (
            <table>
                <thead>
                    <tr>
                        <th>Inicio</th>
                        <th>Fin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{primerHorario}</td>
                        <td>{ultimoHorario}</td>
                    </tr>
                </tbody>
            </table>
        );
    };

    return (
        <div className='jumbo'>
            <h2>{espacio.nombre}</h2>
            <p>{espacio.descripcion}</p>
            <p>Costo por hora: ${espacio.costoPorHora}</p>
            {renderHorariosDisponibles()}
            <FormularioReserva espacioId={id} costoPorHora={espacio.costoPorHora} />
        </div>
    );
};
