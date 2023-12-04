import React, { useState, useEffect } from 'react';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import { useNavigate } from 'react-router-dom';

export const ReservasPendientes = () => {
    const [reservasPendientes, setReservasPendientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchReservasPendientes = async () => {
        try {
            const respuesta = await Peticion(`${Global.url}reserva/reservas-pendientes`, 'GET');
            if (!respuesta.ok) throw new Error('Error al obtener las reservas pendientes');
            setReservasPendientes(respuesta.datos.reservas);
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    };

    // useEffect que llama a fetchReservasPendientes cuando el componente se monta
    useEffect(() => {
        fetchReservasPendientes();
    }, []);

    const confirmarReserva = async (reservaId) => {
        try {
            const respuesta = await Peticion(`${Global.url}reserva/confirmar/${reservaId}`, 'PATCH');
            if (!respuesta.ok) throw new Error('Error al confirmar la reserva');
            // Ahora fetchReservasPendientes es accesible aquí
            await fetchReservasPendientes();
        } catch (error) {
            setError(error.message);
        }
    };

    const cancelarReserva = async (reservaId) => {
        try {
            const respuesta = await Peticion(`${Global.url}reserva/reservas/${reservaId}/cancelar`, 'DELETE');
            if (!respuesta.ok) throw new Error('Error al cancelar la reserva');
    
            // Recargar las reservas pendientes o actualizar el estado local
            await fetchReservasPendientes();
        } catch (error) {
            setError(error.message);
        }
    };

    if (cargando) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="reservas-pendientes">
            <h2>Reservas Pendientes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Espacio</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Fin</th>
                        <th>Costo Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservasPendientes.map((reserva) => (
                        <tr key={reserva._id}>
                            <td>{reserva.usuario.name}</td> {/* Asumiendo que el nombre del usuario está disponible */}
                            <td>{reserva.espacio.nombre}</td>
                            <td>{new Date(reserva.fechaInicio).toLocaleString()}</td>
                            <td>{new Date(reserva.fechaFin).toLocaleString()}</td>
                            <td>${reserva.costoTotal.toFixed(2)}</td>
                            <td>
                                <button onClick={() => confirmarReserva(reserva._id)}>Confirmar</button>
                                <button onClick={() => cancelarReserva(reserva._id)}>Cancelar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
