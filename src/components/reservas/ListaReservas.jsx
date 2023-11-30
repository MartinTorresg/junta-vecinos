import React, { useState, useEffect } from 'react';
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

export const ListaReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const { auth } = useAuth();

    useEffect(() => {
        const fetchReservas = async () => {
            if (!auth._id) return;

            setCargando(true);
            try {
                const response = await fetch(`${Global.url}reserva/reservas/usuario/${auth._id}`);
                const data = await response.json();
                if (response.ok) {
                    setReservas(data);
                } else {
                    throw new Error(data.message || 'Error al obtener las reservas');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setCargando(false);
            }
        };

        fetchReservas();
    }, [auth]);

    const formatearHora = (fecha) => {
        // Crear un objeto Date con la fecha y hora
        const date = new Date(fecha);
        // Formatear la fecha para mostrar solo la hora y minutos
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (cargando) return <p>Cargando reservas...</p>;
    if (error) return <p>Error al cargar reservas: {error}</p>;
    if (!reservas.length) return <p>No tienes reservas.</p>;

    return (
        <div className="lista-reservas">
            <h2>Mis Reservas</h2>
            {reservas.map((reserva) => (
                <div key={reserva._id} className="reserva-item">
                    <h3><Link to={"/social/reservas/" + reserva._id}>{reserva.espacio.nombre}</Link></h3>
                    <p className="reserva-detalle">
                        <strong>Fecha:</strong> {new Date(reserva.fechaInicio).toLocaleDateString()}
                    </p>
                    <p className="reserva-detalle">
                        <strong>Hora Inicio:</strong> {formatearHora(reserva.fechaInicio)}
                    </p>
                    <p className="reserva-detalle">
                        <strong>Hora Fin:</strong> {formatearHora(reserva.fechaFin)}
                    </p>
                    <p className="reserva-detalle">
                        <strong>Costo Total:</strong> ${reserva.costoTotal}
                    </p>
                    {/* Más detalles de la reserva */}
                </div>
            ))}
        </div>
    );
};
