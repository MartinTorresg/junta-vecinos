import React, { useState, useEffect } from 'react';
import { FormularioArticulos } from "../../hooks/FormularioArticulos";
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import { useParams, useNavigate } from 'react-router-dom';

export const FormularioEspacio = () => {
    const { espacioId } = useParams(); // Obtiene el espacioId de la URL
    const navigate = useNavigate();
    const { formulario, cambiado, setFormulario } = FormularioArticulos({});
    const [resultado, setResultado] = useState("no_enviado");
    const [horarioInicio, setHorarioInicio] = useState('');
    const [horarioFin, setHorarioFin] = useState('');
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        const cargarDatosEspacio = async () => {
            if (espacioId) {
                setCargando(true);
                try {
                    const data = await Peticion(`${Global.url}espacio/espacios/detalle/${espacioId}`, 'GET');
                    if (data.espacio) {
                        setFormulario({
                            nombre: data.espacio.nombre,
                            descripcion: data.espacio.descripcion,
                            costoPorHora: data.espacio.costoPorHora,
                            horarioInicio: data.espacio.horariosDisponibles.inicio,
                            horarioFin: data.espacio.horariosDisponibles.fin,
                        });
                        setResultado(""); // Resetea el estado de resultado si se cargan los datos con éxito
                    } else {
                        setResultado("error");
                    }
                } catch (error) {
                    console.error("Error al cargar los datos del espacio:", error);
                    setResultado("error");
                }
                setCargando(false);
            }
        };
    
        cargarDatosEspacio();
    }, [espacioId, setFormulario]);

    const guardarEspacio = async (e) => {
        e.preventDefault();
        console.log("Intentando guardar el espacio:", formulario);
        setResultado("cargando"); // Estado de carga mientras esperamos la respuesta

        // Construye el objeto espacio con los datos del formulario
        let nuevoEspacio = {
            ...formulario,
            horariosDisponibles: {
                inicio: horarioInicio !== '',
                fin: horarioFin !== ''
            }
            // Agrega cualquier otro campo que necesites enviar
        };
        console.log("Nuevo espacio a enviar:", nuevoEspacio); // Verificar la estructura del nuevoEspacio

        try {
            const metodo = espacioId ? 'PUT' : 'POST';
            const url = espacioId ? `${Global.url}espacio/espacios/actualizar/${espacioId}` : `${Global.url}espacio/espacios`;
            const response = await fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoEspacio),
            });
    
            const datos = await response.json();
            console.log("Respuesta recibida:", datos);
    
            if (response.ok) {
                console.log("Espacio creado o actualizado con éxito:", datos);
                setResultado("guardado");
                navigate('/social/espacios');
            } else {
                console.log("Error al guardar el espacio:", datos);
                setResultado("error");
            }
        } catch (error) {
            console.error("Error durante el envío del formulario:", error);
            setResultado("error");
        }
    };

    return (
        <div className='jumbo'>
            <h1>{espacioId ? 'Actualizar' : 'Crear Nuevo'} Espacio</h1>
            {resultado === "cargando" && <p>Guardando...</p>}
            {resultado === "guardado" && <p>Espacio guardado con éxito !!</p>}
            {/*resultado === "error" && <p>Error al guardar el espacio.</p>*/}

            {/* Crear el formulario */}
            <form className='formulario' onSubmit={guardarEspacio}>
                {/* Campos del formulario */}
                <div className='form-group'>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea name="descripcion" onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor="costoPorHora">Costo por Hora</label>
                    <input type="number" name="costoPorHora" onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor="horarioInicio">Horario de Inicio</label>
                    <input type="time" name="horarioInicio" value={horarioInicio} onChange={(e) => setHorarioInicio(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label htmlFor="horarioFin">Horario de Fin</label>
                    <input type="time" name="horarioFin" value={horarioFin} onChange={(e) => setHorarioFin(e.target.value)} />
                </div>

                {/* Añade más campos si es necesario */}
                <input type='submit' value="Guardar" className='btn btn-success' />
            </form>
        </div>
    );
};
