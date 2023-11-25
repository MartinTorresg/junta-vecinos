import React, { useState } from 'react';
import { FormularioArticulos } from "../../hooks/FormularioArticulos";
import { useRegionesComunas } from '../../helpers/useRegionesComunas';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const CrearCertificados = () => {
    const { formulario, enviado, cambiado } = FormularioArticulos({});
    const [resultado, setResultado] = useState("no_enviado");
    const { regiones, comunas, handleRegionChange } = useRegionesComunas(cambiado);

    const guardarCertificado = async (e) => {
        e.preventDefault();
    
        console.log("Datos del formulario a enviar:", formulario); // Información de los datos del formulario
        let nuevoCertificado = formulario;
    
        try {
            const response = await Peticion(Global.url + "certificado/crear_certificado", "POST", nuevoCertificado);
            console.log("Respuesta del servidor:", response); // Información de la respuesta del servidor
    
            if (response.datos && response.datos.status === "success") {
                setResultado("guardado");
            } else {
                setResultado("error");
            }
        } catch (error) {
            console.error("Error durante el envío del formulario:", error);
            setResultado("error");
        }
    };

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
                    <label htmlFor="email">Correo</label>
                    <input type="text" name="email" onChange={cambiado} />
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
                    <select name="region" onChange={handleRegionChange}>
                        {regiones.map(region => (
                            <option key={region._id} value={region._id}>{region.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor="comuna">Comuna</label>
                    <select name="comuna" onChange={cambiado}>
                        {comunas.map(comuna => (
                            <option key={comuna._id} value={comuna._id}>{comuna.nombre}</option>
                        ))}
                    </select>
                </div>

                <input type='submit' value="Guardar" className='btn btn-success' />
            </form>
        </div>
    );
}
