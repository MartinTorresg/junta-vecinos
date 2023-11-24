import React, { useState } from 'react';
import { FormularioArticulos } from "../../hooks/FormularioArticulos";
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const CrearInscripcion = () => {

    const { formulario, cambiado } = FormularioArticulos({});
    const [resultado, setResultado] = useState("no_enviado");
    

    const formatearRut = (rutSinFormato) => {
        let rutLimpio = rutSinFormato.replace(/\./g, '').replace('-', '');
        if (rutLimpio.length > 9) {
            rutLimpio = rutLimpio.substring(0, 9);
        }
        if (rutLimpio.length > 1) {
            rutLimpio = `${rutLimpio.slice(0, -1)}-${rutLimpio.slice(-1)}`;
        }
        return rutLimpio.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleChangeRut = (e) => {
        const rutFormateado = formatearRut(e.target.value);
        cambiado({ target: { name: 'run', value: rutFormateado } });
    };

    const guardarInscripcion = async (e) => {
        e.preventDefault();

        let nuevoInscripcion = formulario;

        const { datos } = await Peticion(Global.url + "inscripcion/register", "POST", nuevoInscripcion);

        if (datos.status === "success") {
            setResultado("guardado");
        } else {
            setResultado("error");
        }
    }

    return (
        <>
            <div className='jumbo'>

                <h1>Crear Inscripción</h1>
                <p>Formulario para crear una inscripción</p>

                {resultado === "guardado" ?
                    <strong className='alert alert-success'>Vecino registrado correctamente !!</strong>
                    : ''}

                {resultado === "error" ?
                    <strong className='alert alert-danger'>Vecino no se registró !!</strong>
                    : ''}

                <form className='register-form' onSubmit={guardarInscripcion}>
                    <div className='form-group'>
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" name="nombre" onChange={cambiado} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="apellido">Apellidos</label>
                        <input type="text" name="apellido" onChange={cambiado} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="run">Run</label>
                        <input type="text" name="run" value={formulario.run} onChange={handleChangeRut} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" name="email" onChange={cambiado} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                        <input type="date" name="fecha_nacimiento" onChange={cambiado} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="direccion">Dirección</label>
                        <input type="text" name="direccion" onChange={cambiado} />
                    </div>

                    <input type="submit" value="Regístrate" className='btn btn-success' />
                </form>
            </div>
        </>
    )
}
