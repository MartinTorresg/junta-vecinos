import React, { useState } from 'react';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import useAuth from '../../hooks/useAuth';

export const FormularioReserva = ({ espacioId }) => {
    const {auth} = useAuth(); // Obtener el usuario actual del hook useAuth
    const [fecha, setFecha] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');

    console.log("datos usuario",auth);
    console.log(auth._id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError('');

        // Verificar si hay un usuario autenticado y su ID está disponible
        if (!auth || !auth._id) {
            setError('Usuario no identificado. Por favor, inicia sesión.');
            setCargando(false);
            return;
        }

        const reserva = {
            usuarioId: auth.id,
            espacioId,
            fecha,
            horaInicio,
            horaFin
        };

        try {
            const response = await Peticion(`${Global.url}reserva/reservas`, 'POST', reserva);
            if (response.ok) {
                // Manejo en caso de éxito, por ejemplo, redirigir o mostrar mensaje de éxito
            } else {
                setError('Error al realizar la reserva. Por favor, inténtalo de nuevo.');
            }
        } catch (err) {
            setError('Error al conectar con el servicio. Por favor, verifica tu conexión.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Realizar una Reserva</h2>
            {error && <p className="error">{error}</p>}
            {/* Aquí irían los inputs para seleccionar el espacio, fecha, horaInicio y horaFin */}
            <label>
                Fecha:
                <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
            </label>
            <label>
                Hora de inicio:
                <input type="time" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} />
            </label>
            <label>
                Hora de fin:
                <input type="time" value={horaFin} onChange={e => setHoraFin(e.target.value)} />
            </label>
            <button type="submit" disabled={cargando}>
                {cargando ? 'Reservando...' : 'Reservar'}
            </button>
        </form>
    );
};
