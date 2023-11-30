import React, { useState, useEffect } from 'react';
import { FormularioArticulos } from "../../hooks/FormularioArticulos";
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import { useRegionesComunas } from '../../helpers/useRegionesComunas';

export const CrearInscripcion = () => {

    const { formulario, cambiado } = FormularioArticulos({});
    const [resultado, setResultado] = useState("no_enviado");
    const { regiones, comunas, handleRegionChange } = useRegionesComunas(cambiado);
    const [esRutValido, setEsRutValido] = useState(true);
    const fechaHoy = new Date();
    const fechaMinima = new Date();
    fechaMinima.setFullYear(fechaHoy.getFullYear() - 150);


    const formatoFecha = (fecha) => {
        let dia = ('0' + fecha.getDate()).slice(-2);
        let mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
        let año = fecha.getFullYear();
        return `${año}-${mes}-${dia}`;
    };

    const fechaMaxima = formatoFecha(fechaHoy);
    const fechaMinimaString = formatoFecha(fechaMinima);


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

        if (rutFormateado.replace(/\./g, '').replace('-', '').length >= 9) {
            if (validarRut(rutFormateado)) {
                cambiado({ target: { name: 'run', value: rutFormateado } });
                setEsRutValido(true);
            } else {
                setEsRutValido(false);
            }
        } else {
            cambiado({ target: { name: 'run', value: rutFormateado } });
            setEsRutValido(true); // Se asume válido hasta que se ingrese completamente
        }
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
                        {!esRutValido && <div className="error-message">RUT inválido</div>}
                    </div>

                    <div className='form-group'>
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" name="email" onChange={cambiado} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            name="fecha_nacimiento"
                            onChange={cambiado}
                            max={fechaMaxima}
                            min={fechaMinimaString}
                        />
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
