import React from 'react';
import { Link } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import useAuth from '../../hooks/useAuth';

export const ListadoActividades = ({ actividades, setActividades }) => {
    const { auth } = useAuth();

    const eliminar = async (id) => {
        let { datos } = await Peticion(Global.url + "actividad/eliminar/" + id, "DELETE");

        if (datos.status === "success") {
            let actividadesActualizadas = actividades.filter(actividad => actividad._id !== id);
            setActividades(actividadesActualizadas);
        }
    };

    const aprobar = async (id) => {
        let { datos } = await Peticion(Global.url + "actividad/aprobar/" + id, "PUT");

        if (datos.status === "success") {
            let actividadesActualizadas = actividades.map(actividad => {
                if (actividad._id === id) {
                    return { ...actividad, estado: 'aprobada' };
                }
                return actividad;
            });
            setActividades(actividadesActualizadas);
        }
    };

    return (
        actividades.map(actividad => {
            return (
                <article key={actividad._id} className="articulo-item">
                    <div className='datos'>
                        <h3 className="title"><Link to={"/admin/actividad/" + actividad._id}>{actividad.nombre}</Link></h3>
                        <p className="description">Fecha: {new Date(actividad.fecha).toLocaleDateString()}</p>
                        <p className="description">Hora: {actividad.hora}</p>
                        <p className="description">Lugar: {actividad.lugar}</p>
                        <p className="description">Cupo: {actividad.cupo}</p>

                        {auth.email === 'admin@gmail.com' && (
                            <div>
                                <button className="edit">Editar</button>
                                <button className="delete" onClick={() => eliminar(actividad._id)}>Borrar</button>
                                {actividad.estado !== 'aprobada' && (
                                    <button className="approve" onClick={() => aprobar(actividad._id)}>Aprobar</button>
                                )}
                            </div>
                        )}
                    </div>
                </article>
            );
        })
    )
};
