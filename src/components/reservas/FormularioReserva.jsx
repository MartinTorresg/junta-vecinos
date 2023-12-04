import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';

export const FormularioReserva = ({ espacioId, costoPorHora }) => {
  const [fecha, setFecha] = useState('');
  const [duracion, setDuracion] = useState('');
  const [hora, setHora] = useState('');
  const [error, setError] = useState(''); // Estado para el mensaje de error
  const { auth } = useAuth();
  const fechaActual = new Date().toISOString().split('T')[0];
  const [mensajeExito, setMensajeExito] = useState('');

  const horasDisponibles = [...Array(24).keys()].map(hora =>
    `${hora.toString().padStart(2, '0')}:00`); // Esto generará horas de "00:00" a "23:00"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar el mensaje de error anterior
    setMensajeExito('');

    const reserva = {
      usuarioId: auth._id,
      espacioId,
      fecha,
      duracion,
      hora
    };

    try {
      const response = await fetch(Global.url + 'reserva/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reserva),
      });

      const data = await response.json();
      if (response.ok) {
        setMensajeExito('Reserva creada con éxito.'); // Actualizar el estado con el mensaje de éxito
        console.log('Reserva creada:', data);
        // Otras acciones tras el éxito, como limpiar el formulario
        setFecha('');
        setDuracion('');
        setHora('');
        setTimeout(() => {
          window.location.href = 'http://localhost:5173/social/reservas';
        }, 3000);
      } else {
        // Aquí estableces el mensaje de error que llega del servidor
        setError(data.message || 'Error al crear la reserva. Por favor, intente de nuevo.');
      }
    } catch (error) {
      // Aquí manejas errores de red y otros errores inesperados
      setError('Error al conectar con el servidor. Por favor, verifica tu conexión a internet.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reserva de Espacio</h2>
      {/* Aquí mostramos el mensaje de error si existe */}
      {mensajeExito && <p className="exito">{mensajeExito}</p>} {/* Mensaje de éxito */}
      {error && <p className="error">{error}</p>}
      {console.log(espacioId)}

      <label htmlFor="fecha">Fecha:</label>
      <input
        type="date"
        id="fecha"
        name="fecha"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        min={fechaActual}
        required
      />


      <label htmlFor="duracion">Duración (horas):</label>
      <input
        type="number"
        id="duracion"
        name="duracion"
        value={duracion}
        onChange={(e) => setDuracion(e.target.value)}
        required
      />

      <label htmlFor="hora">Hora de inicio:</label>
      <select
        id="hora"
        name="hora"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
        required
      >
        {horasDisponibles.map(horaEnPunto => (
          <option key={horaEnPunto} value={horaEnPunto}>{horaEnPunto}</option>
        ))}
      </select>

      <button type="submit">Reservar</button>
    </form>
  );
};
