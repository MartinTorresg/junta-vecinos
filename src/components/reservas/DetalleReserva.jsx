import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const DetalleReserva = () => {
    const [reserva, setReserva] = useState(null);
    const [cargando, setCargando] = useState(true);
    const { id } = useParams(); // ID de la reserva

    useEffect(() => {
        const obtenerReserva = async () => {
            setCargando(true);
            try {
                const response = await Peticion(`${Global.url}reserva/detalle-reserva/${id}`, 'GET');
                if (response.ok && response.reserva) {
                    setReserva(response.reserva);
                } else {
                    throw new Error('La reserva no se pudo obtener.');
                }
            } catch (error) {
                console.error("Error al obtener detalles de la reserva:", error);
            } finally {
                setCargando(false);
            }
        };

        obtenerReserva();
    }, [id]);

    if (cargando) return <div>Cargando detalles de la reserva...</div>;
    if (!reserva) return <div>No se encontró la reserva solicitada.</div>;

    return (
        <div>
            <h2>Detalles de la Reserva</h2>
            <p>Espacio: {reserva.espacio.nombre}</p>
            <p>Fecha de inicio: {new Date(reserva.fechaInicio).toLocaleString()}</p>
            <p>Fecha de fin: {new Date(reserva.fechaFin).toLocaleString()}</p>
            <p>Costo total: {reserva.costoTotal}</p>
            <p>Estado de la reserva: {reserva.estadoReserva}</p>
            {/* Otros detalles de la reserva */}
        </div>
    );
};
