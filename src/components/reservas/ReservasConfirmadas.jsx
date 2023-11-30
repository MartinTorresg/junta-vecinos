import React, { useState, useEffect } from 'react';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const ReservasConfirmadas = () => {
    const [reservasConfirmadas, setReservasConfirmadas] = useState([]);
    const [totalGanancias, setTotalGanancias] = useState(0);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReservasConfirmadas = async () => {
            try {
                console.log("Iniciando la petición para obtener reservas confirmadas");
                const respuesta = await Peticion(`${Global.url}reserva/reservas-historial`, 'GET');
                console.log("Respuesta recibida de Peticion:", respuesta);
                console.log(respuesta.datos.totalGanancias)
    
                if (!respuesta.ok) throw new Error('Error al obtener las reservas confirmadas');
    
                // Aquí asumimos que la estructura de respuesta.datos es la que esperamos
                console.log("Datos recibidos de reservas:", respuesta.datos.reservas);
                console.log("Total ganancias recibidas:", respuesta.datos.totalGanancias);
    
                setReservasConfirmadas(respuesta.datos.reservas);
                setTotalGanancias(respuesta.datos.totalGanancias);
            } catch (error) {
                console.error("Error capturado en el catch:", error);
                setError(error.message);
            } finally {
                setCargando(false);
            }
        };
    
        fetchReservasConfirmadas();
    }, []);
    

    if (cargando) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="reservas-confirmadas">
            <h2>Reservas Confirmadas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Espacio</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Fin</th>
                        <th>Costo Total</th>
                    </tr>
                </thead>
                <tbody>
                    {reservasConfirmadas.map((reserva) => (
                        <tr key={reserva._id}>
                            <td>{reserva.espacio.nombre}</td>
                            <td>{new Date(reserva.fechaInicio).toLocaleString()}</td>
                            <td>{new Date(reserva.fechaFin).toLocaleString()}</td>
                            <td>${reserva.costoTotal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="total-ganancias">Ganancias Totales: ${totalGanancias.toFixed(2)}</p>
        </div>
    );
};
