import React from 'react'
import { Link } from 'react-router-dom';
import { Global } from "../../helpers/Global";
import { Peticion } from '../../helpers/Peticion';
import useAuth from '../../hooks/useAuth';

export const Listado = ({ articulos, setArticulos }) => {
    const { auth, loading } = useAuth();

    const eliminar = async (id) => {
        let { datos } = await Peticion(Global.url + "articulo/" + id, "DELETE");

        if (datos.status === "success") {
            let articulosActualizados = articulos.filter(articulo => articulo._id !== id);
            setArticulos(articulosActualizados);
        }
    }

    return (
        <div className="listado-contenedor"> {/* Contenedor agregado */}
            {articulos.map(articulo => (
                <article key={articulo._id} className="articulo-item">
                    <div className='mascara'>
                        {articulo.imagen !== "default.png" ? 
                            <img src={Global.url + "imagen/" + articulo.imagen} alt={articulo.titulo} /> : 
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png" alt="Default" />
                        }
                    </div>
                    <div className='datos'>
                        <h3 className="title"><Link to={"/social/articulo/" + articulo._id}>{articulo.titulo}</Link></h3>
                        <p className="description">{articulo.contenido}</p>

                        {auth.email === 'admin@gmail.com' && (
                            <div>
                                <button className="delete" onClick={() => eliminar(articulo._id)}>Borrar</button>
                            </div>
                        )}
                    </div>
                </article>
            ))}
        </div>
    )
}
