import React from 'react';
import { useState } from 'react';
import { FormularioArticulos } from "../../hooks/FormularioArticulos"; // Asegúrate de tener el hook FormularioActividades
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const CrearActividad = () => {
    const { formulario, enviado, cambiado } = FormularioArticulos({});
    const [resultado, setResultado] = useState('no_enviado');

    const guardarActividad = async (e) => {
        e.preventDefault();

        // Recoger datos del formulario
        let nuevaActividad = formulario;

        // Guardar Actividad en el backend
        const { datos } = await Peticion(Global.url + 'actividad/crear_actividad', 'POST', nuevaActividad);

        if (datos.status === 'success') {
            setResultado('guardado');
        } else {
            setResultado('error');
        }
    };

    return (
        <div className='jumbo'>
            <h1>Crear actividad</h1>
            <p>Formulario para crear una actividad</p>

            <strong>{resultado === 'guardado' ? 'Actividad guardada con éxito !!' : ''}</strong>
            <strong>{resultado === 'error' ? 'Los datos proporcionados son incorrectos' : ''}</strong>

            {/* Crear el formulario */}
            <form className='formulario' onSubmit={guardarActividad}>
                <div className='form-group'>
                    <label htmlFor='nombre'>Nombre</label>
                    <input type='text' name='nombre' onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor='fecha'>Fecha</label>
                    <input type='date' name='fecha' onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor='hora'>Hora</label>
                    <input type='text' name='hora' onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor='lugar'>Lugar</label>
                    <input type='text' name='lugar' onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor='cupo'>Cupo</label>
                    <input type='number' name='cupo' onChange={cambiado} />
                </div>

                <input type='submit' value='Guardar' className='btn btn-success' />
            </form>
        </div>
    );
};
