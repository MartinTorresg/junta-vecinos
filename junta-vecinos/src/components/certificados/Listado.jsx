import React from 'react';
import { Link } from 'react-router-dom';
import { Global } from "../../helpers/Global";
import { Peticion } from '../../helpers/Peticion';
import useAuth from '../../hooks/useAuth';

export const Listado = ({ certificados, setCertificados }) => {
    const { auth, loading } = useAuth();

    const eliminarCertificado = async (id) => {
        let { datos } = await Peticion(Global.url + "certificado/" + id, "DELETE");

        if (datos.status === "success") {
            let certificadosActualizados = certificados.filter(certificado => certificado._id !== id);
            setCertificados(certificadosActualizados);
        }
    };

    return (
        certificados.map(certificado => {
            return (
                <article key={certificado._id} className="articulo-item">
                    <div className='datos'>
                        <h3 className="title"><Link to={"/admin/certificados/" + certificado._id}>{certificado.nombre}</Link></h3>
                        <p><strong>RUT: </strong>{certificado.rut}</p>
                        <p><strong>Dirección: </strong>{certificado.direccion}</p>
                        <p><strong>Región: </strong>{certificado.region}</p>
                        <p><strong>Comuna: </strong>{certificado.comuna}</p>

                        {auth.email === 'admin@gmail.com' && (
                            <div>
                                <button className="edit">Editar</button>
                                <button className="delete" onClick={() => eliminarCertificado(certificado._id)}>Borrar</button>
                            </div>
                        )}
                    </div>
                </article>
            );
        })
    );
};
