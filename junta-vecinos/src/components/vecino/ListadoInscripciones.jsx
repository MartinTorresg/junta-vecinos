import React from 'react'
import { Link } from 'react-router-dom';
import { Global } from "../../helpers/Global";
import { Peticion } from '../../helpers/Peticion';
import useAuth from '../../hooks/useAuth';

export const ListadoInscripciones = ({ inscripciones, setInscripciones }) => {

    const { auth, loading } = useAuth();
    const eliminar = async (id) => {
        let { datos } = await Peticion(Global.url + "inscripcion/inscripcion/" + id, "DELETE");

        if (datos.status === "success") {
            let inscripcionesActualizados = inscripciones.filter(inscripciones => inscripciones._id !== id);
            setInscripciones(inscripcionesActualizados);
        }

    }

    return (
        inscripciones.map(inscripcion => {
            return (
                <article key={inscripcion._id} className="articulo-item">
                    <div className='datos'>
                        <h3 className="title"><Link to={"/admin/inscripcion/" + inscripcion._id}>{inscripcion.nombre}</Link></h3>
                        <p className="description">{inscripcion.apellido}</p>

                        {auth.email === 'admin@gmail.com' && (
                            <div>
                                <button className="delete" onClick={() => eliminar(inscripcion._id)}>Borrar</button>
                            </div>
                        )}
                    </div>

                </article>
            );
        })
    )
}
