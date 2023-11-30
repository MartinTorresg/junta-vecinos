import React, { useState } from 'react';
import { FormularioArticulos } from "../../hooks/FormularioArticulos";
import { useRegionesComunas } from '../../helpers/useRegionesComunas';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const CrearCertificados = () => {
    const { formulario, enviado, cambiado } = FormularioArticulos({});
    const [resultado, setResultado] = useState("no_enviado");
    const { regiones, comunas, handleRegionChange } = useRegionesComunas(cambiado);

    const [rutValido, setRutValido] = useState(true);

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

    const validarRut = (rut) => {
        // Limpiar el RUT
        let rutLimpio = rut.replace(/\./g, '').replace('-', '');

        // Verificar si el RUT tiene la longitud mínima requerida
        if (rutLimpio.length < 2) {
            return false;
        }

        // Separar el cuerpo del dígito verificador
        let cuerpo = rutLimpio.slice(0, -1);
        let dv = rutLimpio.slice(-1).toUpperCase();

        // Calcular dígito verificador
        let suma = 0;
        let multiplicador = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += multiplicador * cuerpo[i];
            multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
        }

        let dvEsperado = 11 - (suma % 11);
        dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

        // Comparar el dígito verificador
        return dv === dvEsperado;
    };

    const handleChangeRut = (e) => {
        const rutFormateado = formatearRut(e.target.value);
        setRutValido(validarRut(rutFormateado));
        cambiado({ target: { name: 'rut', value: rutFormateado } });
    };

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
                    <input type="email" name="email" onChange={cambiado} />
                </div>

                <div className='form-group'>
                <label htmlFor="rut">RUT</label>
                <input type="text" name="rut" value={formulario.rut} onChange={handleChangeRut} />
                {!rutValido && <div className="error-message">RUT inválido</div>}
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
