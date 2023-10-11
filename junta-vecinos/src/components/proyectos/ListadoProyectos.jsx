import React from 'react'
import { Link } from 'react-router-dom';
import { Global } from "../../helpers/Global";
import { Peticion } from '../../helpers/Peticion';
import useAuth from '../../hooks/useAuth';

export const ListadoProyectos = ({ proyectos, setProyectos }) => {

    const { auth, loading } = useAuth();
    const eliminar = async (id) => {
        let { datos } = await Peticion(Global.url + "proyecto/proyecto/" + id, "DELETE");

        if (datos.status === "success") {
            let proyectosActualizados = proyectos.filter(proyecto => proyecto._id !== id);
            setProyectos(proyectosActualizados);
        }

    }

    return (
        proyectos.map(proyecto => {
            return (
                <article key={proyecto._id} className="articulo-item">
                    <div className='datos'>
                        <h4>Proyecto</h4>
                        <h3 className="title"><Link to={"/admin/proyecto/" + proyecto._id}>{proyecto.nombre}</Link></h3>
                        <p className="description">{proyecto.descripcion}</p>

                        {auth.email === 'admin@gmail.com' && (
                            <div>
                                <button className="edit">Editar</button>
                                <button className="delete" onClick={() => eliminar(proyecto._id)}>Borrar</button>
                            </div>
                        )}
                    </div>

                </article>
            );
        })
    )
}
