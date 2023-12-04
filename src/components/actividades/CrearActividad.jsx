import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth'; // Asumiendo que tienes un hook de autenticación
import { Global } from '../../helpers/Global';

export const CrearActividad = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [lugar, setLugar] = useState('');
  const [cupo, setCupo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const { auth } = useAuth(); // Asumiendo que el hook de autenticación proporciona los datos del usuario autenticado

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    const actividad = {
      user: auth._id, // ID del usuario autenticado
      nombre,
      fecha,
      hora,
      lugar,
      cupo
    };

    try {
      const response = await fetch(Global.url + 'actividad/crear_actividad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actividad),
      });

      const data = await response.json();
      if (response.ok) {
        setMensaje('Actividad creada con éxito.');
        console.log('Actividad creada:', data);
        // Limpiar el formulario
        setNombre('');
        setFecha('');
        setHora('');
        setLugar('');
        setCupo('');
      } else {
        setError(data.message || 'Error al crear la actividad. Por favor, intente de nuevo.');
      }
    } catch (error) {
      setError('Error al conectar con el servidor. Por favor, verifica tu conexión a internet.');
    }
  };

  return (
    <div className='jumbo'>
      <h1>Crear actividad</h1>
      <p>Formulario para crear una actividad</p>

      {mensaje && <p className="exito">{mensaje}</p>} {/* Mensaje de éxito */}
      {error && <p className="error">{error}</p>} {/* Mensaje de error */}

      <form className='formulario' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='nombre'>Nombre</label>
          <input type='text' id='nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>

        <div className='form-group'>
          <label htmlFor='fecha'>Fecha</label>
          <input type='date' id='fecha' value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        </div>

        <div className='form-group'>
          <label htmlFor='hora'>Hora</label>
          <input type='time' id='hora' value={hora} onChange={(e) => setHora(e.target.value)} required />
        </div>

        <div className='form-group'>
          <label htmlFor='lugar'>Lugar</label>
          <input type='text' id='lugar' value={lugar} onChange={(e) => setLugar(e.target.value)} required />
        </div>

        <div className='form-group'>
          <label htmlFor='cupo'>Cupo</label>
          <input type='number' id='cupo' value={cupo} onChange={(e) => setCupo(e.target.value)} required />
        </div>

        <button type='submit' className='btn btn-success'>Guardar</button>
      </form>
    </div>
  );
};
