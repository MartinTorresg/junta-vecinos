import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const ListaReservas = () => {
    const [reservas, setReservas] = useState([]);
    const {user} = useAuth(); // Asumiendo que tienes un hook useAuth para obtener el usuario actual

    useEffect(() => {
        // Suponiendo que tienes un endpoint para obtener las reservas del usuario
        const fetchReservas = async () => {
            const response = await Peticion(`${Global.url}reserva/reservas/usuario/${user._id}`, 'GET');
            if (response.ok) {
                setReservas(response.reservas);
            }
        };

        if (user && user._id) {
            fetchReservas();
        }
    }, [user]);

    return (
        <div>
            <h2>Mis Reservas</h2>
            {reservas.map(reserva => (
                <div key={reserva._id}>
                    <p>Espacio: {reserva.espacio.nombre}</p>
                    <p>Fecha: {new Date(reserva.fechaInicio).toLocaleString()}</p>
                    {/* Otros detalles de la reserva */}
                </div>
            ))}
        </div>
    );
};
