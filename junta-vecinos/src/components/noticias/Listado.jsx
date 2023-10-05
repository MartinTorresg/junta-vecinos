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
        articulos.map(articulo => {
            return (
                <article key={articulo._id} className="articulo-item">
                    <div className='mascara'>
                        {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
                        {!articulo.imagen == "default.png" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png" />}
                    </div>
                    <div className='datos'>
                        <h3 className="title"><Link to={"/social/articulo/" + articulo._id}>{articulo.titulo}</Link></h3>
                        <p className="description">{articulo.contenido}</p>

                        {auth.email === 'admin@gmail.com' && (
                            <div>
                                <button className="edit">Editar</button>
                                <button className="delete" onClick={() => eliminar(articulo._id)}>Borrar</button>
                            </div>
                        )}
                    </div>

                </article>
            );
        })
    )
}
