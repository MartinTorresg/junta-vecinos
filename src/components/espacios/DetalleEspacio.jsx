import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { FormularioReserva } from '../reservas/FormularioReserva'; // Asegúrate de importar correctamente el componente


export const DetalleEspacio = () => {
    const [espacio, setEspacio] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [mostrarFormularioReserva, setMostrarFormularioReserva] = useState(false);
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
    

    const toggleFormularioReserva = () => {
        setMostrarFormularioReserva(!mostrarFormularioReserva);
    };

    if (!espacio) return <div>No se encontró el espacio solicitado.</div>;

    const renderHorariosDisponibles = () => {
        if (!espacio.horariosDisponibles || espacio.horariosDisponibles.length === 0) {
            return <p>No hay horarios disponibles para este espacio.</p>;
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th>Inicio</th>
                        <th>Fin</th>
                        <th>Disponible</th>
                    </tr>
                </thead>
                <tbody>
                    {espacio.horariosDisponibles.map((tramo, index) => (
                        <tr key={index}>
                            <td>{tramo.inicio}</td>
                            <td>{tramo.fin}</td>
                            <td>{tramo.reservado ? "No" : "Sí"}</td>
                        </tr>
                    ))}
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

            <button onClick={toggleFormularioReserva} className='btn btn-primary'>
                {mostrarFormularioReserva ? 'Cancelar Reserva' : 'Reservar'}
            </button>
            {mostrarFormularioReserva && <FormularioReserva espacioId={id} />}
        </div>
    );
};
