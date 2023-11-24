import React, { useState, useEffect } from 'react';
import { FormularioArticulos } from "../../hooks/FormularioArticulos";
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const CrearCertificados = () => {
    const { formulario, enviado, cambiado } = FormularioArticulos({});
    const [resultado, setResultado] = useState("no_enviado");
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);

    useEffect(() => {
        // Cargar regiones desde el backend
        const cargarRegiones = async () => {
            const response = await Peticion(Global.url + "regiones/regiones", "GET");
            setRegiones(response.datos); // Ajusta según la estructura de tus datos
        };
        cargarRegiones();
    }, []);

    const handleRegionChange = async (e) => {
        cambiado(e);
        console.log("Región seleccionada:", e.target.value);
    
        try {
            const response = await Peticion(Global.url + `comunas/comunas/region/${e.target.value}`, "GET");
            console.log("Respuesta de comunas:", response);
            setComunas(response.datos);
        } catch (error) {
            console.error("Error al cargar comunas:", error);
        }
    };
    
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
