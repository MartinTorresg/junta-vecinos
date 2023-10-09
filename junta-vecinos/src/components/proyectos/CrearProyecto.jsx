import React from 'react'
import { useState } from "react";
import { FormularioArticulos } from "../../hooks/FormularioArticulos";
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const CrearProyecto = () => {

    const { formulario, enviado, cambiado } = FormularioArticulos({});
    const [resultado, setResultado] = useState("no_enviado");

    const guardarProyecto = async (e) => {
        e.preventDefault();

        // Recoger datos formulario
        let nuevoProyecto = formulario;

        // Guardar Proyecto en el backend
        const { datos } = await Peticion(Global.url + "proyecto/crear_proyecto", "POST", nuevoProyecto);

        if(datos.status === "success"){
            setResultado("guardado");
        }else{
            setResultado("error");
        }
    }

    return (
        <div className='jumbo'>
            <h1>Crear proyecto</h1>
            <p>Formulario para crear un proyecto</p>

            <strong>{resultado == "guardado" ? "Proyecto guardado con exito !!" : ""}</strong>
            <strong>{resultado == "error" ? "Los datos proporcionados son incorrectos" : ""}</strong>
            {/* Crear el formulario */}
            <form className='formulario' onSubmit={guardarProyecto}>

                <div className='form-group'>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor="descripcion">Descripcion</label>
                    <textarea type="text" name="descripcion" onChange={cambiado} />
                </div>

                <input type='submit' value="Guardar" className='btn btn-success' />

            </form>
        </div>
    )
}
