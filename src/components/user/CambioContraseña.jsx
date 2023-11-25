import React, { useState } from 'react';
import { Global } from '../../helpers/Global';

const CambioContraseñaForm = () => {
    const [passwordActual, setPasswordActual] = useState('');
    const [nuevaPassword, setNuevaPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Recuperar el token del almacenamiento local
        const token = localStorage.getItem('token');

        // Datos para cambiar la contraseña
        const cambioContraseñaData = {
            passwordActual,
            nuevaPassword
        };

        try {
            const response = await fetch(Global.url + 'user/cambiar-contrasena', {
                method: 'POST',
                body: JSON.stringify(cambioContraseñaData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token // Adjuntar el token aquí
                },
                
            });

            const data = await response.json();

            if (response.ok) {
                setMensaje('Contraseña cambiada con éxito.');
            } else {
                setMensaje(data.message || 'Error al cambiar la contraseña');
            }
        } catch (error) {
            console.error(error); // Esto te dará más detalles sobre el error
            setMensaje('Error al conectar con el servidor.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Contraseña Actual:</label>
                    <input
                        type="password"
                        value={passwordActual}
                        onChange={(e) => setPasswordActual(e.target.value)}
                    />
                </div>
                <div>
                    <label>Nueva Contraseña:</label>
                    <input
                        type="password"
                        value={nuevaPassword}
                        onChange={(e) => setNuevaPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Cambiar Contraseña</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default CambioContraseñaForm;
