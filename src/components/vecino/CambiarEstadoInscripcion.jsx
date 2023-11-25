import React, { useState } from 'react';
import { Global } from '../../helpers/Global';

export const CambiarEstadoInscripcion = ({ idInscripcion }) => {
    const [nuevoEstado, setNuevoEstado] = useState('En Espera'); // Estado inicial establecido en "En Espera"
    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        setNuevoEstado(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(Global.url + 'inscripcion/cambiar-estado' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: idInscripcion, nuevoEstado })
            });

            const data = await response.json();
            if (data.status === 'success') {
                setMensaje('Estado cambiado con éxito.');
            } else {
                setMensaje('Error al cambiar el estado.');
            }
        } catch (error) {
            setMensaje('Error de conexión al intentar cambiar el estado.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Cambiar Estado de la Inscripción:</label>
                    <select value={nuevoEstado} onChange={handleChange}>
                        <option value="En Espera">En Espera</option>
                        <option value="Aprobada">Aprobada</option>
                        <option value="Rechazada">Rechazada</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>
                <button type="submit">Cambiar Estado</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};
