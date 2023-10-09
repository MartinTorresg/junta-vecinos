import React from 'react'
import { useState } from "react";
import { FormularioArticulos } from "../../hooks/FormularioArticulos";
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const CrearInscripcion = () => {

    const { formulario, enviado, cambiado } = FormularioArticulos({});
    const [resultado, setResultado] = useState("no_enviado");

    const guardarInscripcion = async (e) => {
        e.preventDefault();

        // Recoger datos formulario
        let nuevoInscripcion = formulario;

        // Guardar articulo en el backend
        const { datos } = await Peticion(Global.url + "inscripcion/register", "POST", nuevoInscripcion);

        if(datos.status === "success"){
            setResultado("guardado");
        }else{
            setResultado("error");
        }

    }

    return (
        <>
            <header className='content__header content__header--public'>
                <h1 className='content__title'>Inscripcion</h1>
            </header>
            <div className='content__post'>
                {resultado == "saved" ?
                    <strong className='alert alert-success'>Vecino registrado correctamente !!</strong>
                    : ''}

                {resultado == "error" ?
                    <strong className='alert alert-success'>Vecino no se registro !!</strong>
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
                        <input type="text" name="run" onChange={cambiado} />
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
                        <label htmlFor="direccion">Direccion</label>
                        <input type="text" name="direccion" onChange={cambiado} />
                    </div>

                    <input type="submit" value="Registrate" className='btn btn-success' />

                </form>

            </div>
        </>
    )
}