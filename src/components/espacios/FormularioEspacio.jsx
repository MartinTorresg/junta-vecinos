import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Global } from '../../helpers/Global';

export const FormularioEspacio = () => {
    const { espacioId } = useParams();
    const navigate = useNavigate();
    const [formulario, setFormulario] = useState({
        nombre: '',
        descripcion: '',
        costoPorHora: '',
        horarioInicio: '',
        horarioFin: '',
    });
    const [resultado, setResultado] = useState("");
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if (espacioId) {
            setCargando(true);
            fetch(`${Global.url}espacio/espacios/${espacioId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.espacio) {
                        setFormulario(prevFormulario => ({
                            ...prevFormulario,
                            nombre: data.espacio.nombre,
                            descripcion: data.espacio.descripcion,
                            costoPorHora: data.espacio.costoPorHora,
                            horarioInicio: data.espacio.horarioInicio,
                            horarioFin: data.espacio.horarioFin,
                        }));
                    } else {
                        setResultado("error");
                    }
                })
                .catch(error => {
                    console.error("Error al cargar los datos del espacio:", error);
                    setResultado("error");
                })
                .finally(() => setCargando(false));
        }
    }, [espacioId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario(prevFormulario => ({
            ...prevFormulario,
            [name]: value,
        }));
    };

    const guardarEspacio = async (e) => {
        e.preventDefault();
        setResultado("cargando");
        setCargando(true);

        try {
            const metodo = espacioId ? 'PUT' : 'POST';
            const url = espacioId ? `${Global.url}espacio/espacios/${espacioId}` : `${Global.url}espacio/espacios`;
            const response = await fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formulario),
            });

            const datos = await response.json();

            if (response.ok) {
                setResultado("guardado");
                navigate('/social/espacios');
            } else {
                setResultado("error");
            }
        } catch (error) {
            console.error("Error durante el envío del formulario:", error);
            setResultado("error");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className='jumbo'>
            <h1>{espacioId ? 'Actualizar' : 'Crear Nuevo'} Espacio</h1>
            {cargando && <p>Guardando...</p>}
            {resultado === "guardado" && <p>Espacio guardado con éxito !!</p>}
            {resultado === "error" && <p>Error al guardar el espacio.</p>}

            <form className='formulario' onSubmit={guardarEspacio}>
                <div className='form-group'>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" value={formulario.nombre} onChange={handleChange} />
                </div>

                <div className='form-group'>
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea name="descripcion" value={formulario.descripcion} onChange={handleChange} />
                </div>

                <div className='form-group'>
                    <label htmlFor="costoPorHora">Costo por Hora</label>
                    <input type="number" name="costoPorHora" value={formulario.costoPorHora} onChange={handleChange} />
                </div>

                <div className='form-group'>
                    <label htmlFor="horarioInicio">Horario de Inicio</label>
                    <input type="time" name="horarioInicio" value={formulario.horarioInicio} onChange={handleChange} />
                </div>

                <div className='form-group'>
                    <label htmlFor="horarioFin">Horario de Fin</label>
                    <input type="time" name="horarioFin" value={formulario.horarioFin} onChange={handleChange} />
                </div>

                <input type='submit' value={espacioId ? 'Actualizar' : 'Guardar'} className='btn btn-success' />
            </form>
        </div>
    );
};
