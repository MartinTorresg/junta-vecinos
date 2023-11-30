import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';

export const FormularioReserva = ({ espacioId, costoPorHora }) => {
  const [fecha, setFecha] = useState('');
  const [duracion, setDuracion] = useState('');
  const [hora, setHora] = useState('');
  const {auth} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Construye el objeto de la reserva
    const reserva = {
      usuarioId: auth._id, // Este ID debería venir de la sesión del usuario o un contexto
      espacioId,
      fecha,
      duracion,
      hora
    };
    
    // Aquí harías el envío del objeto de la reserva a tu API
    try {
      const response = await fetch(Global.url +'reserva/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reserva),
      });

      const data = await response.json();
      if (response.ok) {
        // Manejo en caso de éxito (puede ser una redirección o un mensaje de confirmación)
        console.log('Reserva creada:', data);
      } else {
        // Manejo de errores del servidor
        console.error('Error al crear la reserva:', data.message);
      }
    } catch (error) {
      // Manejo de errores de red
      console.error('Error al conectar con el servidor:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reserva de Espacio</h2>
      
      <label htmlFor="fecha">Fecha:</label>
      <input
        type="date"
        id="fecha"
        name="fecha"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
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
      <input
        type="time"
        id="hora"
        name="hora"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
        required
      />
      
      <button type="submit">Reservar</button>
    </form>
  );
};