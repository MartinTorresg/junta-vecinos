import React, { useState } from 'react';
import { FormularioArticulos } from "../../hooks/FormularioArticulos";
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const CrearCertificados = () => {
    const { formulario, enviado, cambiado } = FormularioArticulos({});
    const [resultado, setResultado] = useState("no_enviado");

    const guardarCertificado = async (e) => {
        e.preventDefault();

        // Recoger datos del formulario
        let nuevoCertificado = formulario;

        // Guardar certificado en el backend
        const { datos } = await Peticion(Global.url + "certificado/crear_certificado", "POST", nuevoCertificado);

        if (datos.status === "success") {
            setResultado("guardado");
        } else {
            setResultado("error");
        }
    }

    return (
        <div className='jumbo'>
            <h1>Crear certificado</h1>
            <p>Formulario para crear un certificado</p>

            <strong>{resultado === "guardado" ? "Certificado guardado con éxito !!" : ""}</strong>
            <strong>{resultado === "error" ? "Los datos proporcionados son incorrectos" : ""}</strong>

            {/* Crear el formulario */}
            <form className='formulario' onSubmit={guardarCertificado}>
                <div className='form-group'>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor="rut">RUT</label>
                    <input type="text" name="rut" onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor="direccion">Dirección</label>
                    <input type="text" name="direccion" onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor="region">Región</label>
                    <input type="text" name="region" onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor="comuna">Comuna</label>
                    <input type="text" name="comuna" onChange={cambiado} />
                </div>

                <input type='submit' value="Guardar" className='btn btn-success' />
            </form>
        </div>
    );
}
