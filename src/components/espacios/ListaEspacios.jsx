import React, { useState, useEffect } from 'react';
import { Global } from '../../helpers/Global';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const ListaEspacios = () => {
    const [espacios, setEspacios] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const params = useParams();
    const { auth, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setCargando(true);
        fetch(Global.url + 'espacio/espacios')
            .then((response) => response.json())
            .then((data) => {
                setEspacios(data);
                setCargando(false);
            })
            .catch((err) => {
                setError(err.message);
                setCargando(false);
            });
    }, []);

    const modificarEspacio = (espacioId) => {
        navigate(`/admin/editar-espacio/${espacioId}`); // Ruta de edición de espacio
    };

    const eliminarEspacio = async (id) => {
        try {
            // Llamada al backend para eliminar el espacio
            const respuesta = await fetch(`${Global.url}espacio/espacios/eliminar/${id}`, {
                method: 'DELETE'
            });
    
            const datos = await respuesta.json();
    
            if (respuesta.ok) {
                console.log('Espacio eliminado con éxito:', datos);
                // Actualizar el estado para reflejar que el espacio ha sido eliminado
                // Esto podría implicar filtrar el espacio eliminado de la lista de espacios
                setEspacios(espaciosAnteriores => espaciosAnteriores.filter(espacio => espacio._id !== id));
            } else {
                // Manejar los errores si la respuesta no es exitosa
                console.error('Error al eliminar el espacio:', datos.mensaje);
            }
        } catch (error) {
            // Manejar cualquier error que ocurra durante la petición
            console.error('Error al hacer la petición de eliminar:', error);
        }
    };
    

    if (cargando) return <p className="listado-contenedor">Cargando espacios...</p>;
    if (error) return <p className="listado-contenedor">Error al cargar espacios: {error}</p>;

    return (
        <div className="listado-container"> {/* Agregar contenedor similar al del componente Listado */}
            <h2 className="listado-title">Espacios Disponibles</h2>
            <div className="espacio-items"> {/* Similares a los estilos aplicados en el componente Listado */}
                {espacios.map((espacio) => (
                    <article key={espacio._id} className="espacio-item">
                        <div className='datos'>
                            <h3 className="espacio-name"><Link to={"/social/espacios/" + espacio._id}>{espacio.nombre}</Link></h3>
                            <p className="espacio-description">{espacio.descripcion}</p>
                            <p className="espacio-cost">Costo por hora: ${espacio.costoPorHora}</p>
                            {/* Botón o enlace para ver detalles o reservar */}
                            {auth.email === 'admin@gmail.com' && (
                                <div>
                                    <button onClick={() => eliminarEspacio(espacio._id)}>Eliminar</button>
                                    <button onClick={() => modificarEspacio(espacio._id)}>Modificar</button>
                                </div>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};
