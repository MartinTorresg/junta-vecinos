import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const DetalleReserva = () => {
    const [reserva, setReserva] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const obtenerReserva = async () => {
            setCargando(true);
            setError(null);
            try {
                const response = await fetch(`${Global.url}reserva/reservas/detalle/${id}`);
                const data = await response.json();  // Asegúrate de llamar .json() en la respuesta
                if (!response.ok) {
                    throw new Error(data.mensaje || 'Error al obtener los detalles de la reserva.');
                }
                console.log("Datos de la reserva obtenidos:", data); // Para depuración
                setReserva(data);
            } catch (error) {
                console.error("Error al obtener detalles de la reserva:", error);
                setError(error.message || 'Error al obtener detalles de la reserva.');
            } finally {
                setCargando(false);
            }
        };

        if (id) {
            obtenerReserva();
        }
    }, [id]);

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (cargando) return <div>Cargando detalles de la reserva...</div>;
    if (error) return <div>Error al obtener detalles de la reserva: {error}</div>;
    if (!reserva) return <div>No se encontró la reserva solicitada.</div>;

    return (
        <div className='jumbo'>
            <h2>Detalles de la Reserva</h2>
            <p>Espacio: {reserva.espacio?.nombre}</p>
            <p>Fecha de inicio: {formatearFecha(reserva.fechaInicio)}</p>
            <p>Fecha de fin: {formatearFecha(reserva.fechaFin)}</p>
            <p>Costo total: {reserva.costoTotal}</p>
            <p>Estado de la reserva: {reserva.estadoReserva}</p>
            {/* Otros detalles de la reserva */}
        </div>
    );
};
